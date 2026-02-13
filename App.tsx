import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Section } from './types';
import { SECTIONS } from './constants';
import { startChat, sendMessageToAI, getAnalysis, getSectionSummary } from './services/geminiService';
import IkigaiChart from './components/IkigaiChart';
import Spinner from './components/Spinner';
import { SendIcon, UserIcon, BotIcon, InfoIcon, EditIcon } from './components/Icons';

type Language = 'en' | 'th';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.Intro);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const [isSectionComplete, setIsSectionComplete] = useState(false);
  const [isIkigaiModalOpen, setIsIkigaiModalOpen] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uiStrings = {
    en: {
      findButton: "Let's Find Your Ikigai",
      placeholder: "Type your answer...",
      moveOnButton: "I'm done, summarize this section!",
      continueButton: "Continue to the next section",
      revealCareersButton: "Reveal Career Paths",
      finishJourneyButton: "Finish Journey",
      analyzing: "Analyzing your responses...",
      whatIsIkigai: "What is Ikigai?",
      ikigaiExplanation: "Think of it as finding the sweet spot where your passions and talents meet the things that the world needs and is willing to pay for. It's the reason you get up in the morning!",
      ikigaiConceptTitle: "The Concept of Ikigai",
      ikigaiConceptIntro: "Ikigai (生き甲斐) is a Japanese concept that means 'a reason for being.' It's the idea of finding happiness and purpose in life. The journey to Ikigai is about self-exploration across four key areas:",
      loveTitle: "1.  What You Love:",
      loveDesc: "Your passions, hobbies, and what makes you feel alive.",
      skillsTitle: "2.  What You Are Good At:",
      skillsDesc: "Your skills, talents, and strengths.",
      needsTitle: "3.  What the World Needs:",
      needsDesc: "Problems you can solve or ways you can contribute to others.",
      paidForTitle: "4.  What You Can Be Paid For:",
      paidForDesc: "How your skills can provide value that is economically viable.",
      ikigaiConceptOutro: "The intersection of these areas is where you find your Ikigai—a balanced, fulfilling life.",
      closeButton: "Close",
      startOver: "Start New Journey",
    },
    th: {
      findButton: "มาค้นหาอิคิไกของคุณกัน",
      placeholder: "พิมพ์คำตอบของคุณ...",
      moveOnButton: "พอแล้ว สรุปส่วนนี้เลย!",
      continueButton: "ไปส่วนถัดไป",
      revealCareersButton: "ดูเส้นทางอาชีพ",
      finishJourneyButton: "เสร็จสิ้นการเดินทาง",
      analyzing: "กำลังวิเคราะห์คำตอบของคุณ...",
      whatIsIkigai: "อิคิไกคืออะไร?",
      ikigaiExplanation: "ลองนึกภาพว่าเป็นจุดที่ความหลงใหลและความสามารถของคุณมาบรรจบกับสิ่งที่โลกต้องการและพร้อมที่จะจ่ายให้ มันคือเหตุผลที่คุณตื่นขึ้นมาในตอนเช้า!",
      ikigaiConceptTitle: "แนวคิดของอิคิไก",
      ikigaiConceptIntro: "อิคิไก (生き甲斐) คือแนวคิดของญี่ปุ่นที่หมายถึง 'เหตุผลของการมีชีวิตอยู่' เป็นแนวคิดในการค้นหาความสุขและเป้าหมายในชีวิต การเดินทางสู่อิคิไกคือการสำรวจตนเองใน 4 ด้านหลัก:",
      loveTitle: "1. สิ่งที่คุณรัก:",
      loveDesc: "ความหลงใหล, งานอดิเรก, และสิ่งที่ทำให้คุณรู้สึกมีชีวิตชีวา",
      skillsTitle: "2. สิ่งที่คุณเก่ง:",
      skillsDesc: "ทักษะ, ความสามารถ, และจุดแข็งของคุณ",
      needsTitle: "3. สิ่งที่โลกต้องการ:",
      needsDesc: "ปัญหาที่คุณสามารถแก้ไขหรือวิธีที่คุณสามารถช่วยเหลือผู้อื่นได้",
      paidForTitle: "4. สิ่งที่สร้างรายได้:",
      paidForDesc: "ทักษะของคุณสามารถสร้างคุณค่าที่สามารถสร้างรายได้ได้",
      ikigaiConceptOutro: "จุดตัดของพื้นที่เหล่านี้คือที่ที่คุณจะพบอิคิไกของคุณ—ชีวิตที่สมดุลและเติมเต็ม",
      closeButton: "ปิด",
      startOver: "เริ่มต้นการเดินทางครั้งใหม่",
    }
  };
  
  const getBotBubbleColor = (section: Section): string => {
    switch (section) {
      case Section.Passion:
        return 'bg-rose-600';
      case Section.Skills:
        return 'bg-lime-600';
      case Section.WorldNeeds:
        return 'bg-sky-600';
      case Section.Monetization:
        return 'bg-amber-600';
      case Section.Analysis:
      case Section.Results:
      case Section.Conclusion:
        return 'bg-purple-700';
      default:
        return 'bg-gray-700';
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (!isLoading && !isSectionComplete && currentSection > Section.Intro && currentSection < Section.Analysis) {
      inputRef.current?.focus();
    }
  }, [isLoading, isSectionComplete, currentSection, messages]);

  const handleNextSection = useCallback(() => {
    const nextSection = currentSection + 1;
    if (nextSection <= Section.Conclusion) {
      setCurrentSection(nextSection);
      setQuestionCount(0); 
      setIsSectionComplete(false);
    }
  }, [currentSection]);

  const startNewConversation = useCallback(async (section: Section) => {
    const sectionDetails = SECTIONS[language][section];
    if (!sectionDetails || !('initialQuestion' in sectionDetails) || !sectionDetails.initialQuestion) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'model', text: sectionDetails.initialQuestion, section }]);
    
    if (sectionDetails.systemInstruction) {
      startChat(sectionDetails.systemInstruction);
    }
    setIsLoading(false);
  }, [language]);

  const triggerAnalysis = useCallback(async (section: Section) => {
    const sectionDetails = SECTIONS[language][section];
    if (!('systemInstruction' in sectionDetails) || !sectionDetails.systemInstruction) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'model', text: uiStrings[language].analyzing, section }]);

    let historyForAnalysis: Message[] = messages.filter(m => m.role === 'user' || (m.role === 'model' && !m.text.includes(uiStrings[language].analyzing)));

    // INJECT TRIGGER: If the section has an initialQuestion (like Analysis or Results), 
    // we insert it as a 'user' message to force the model to respond to a specific prompt.
    // This fixes the issue where the model just repeats the last thing it said.
    if ('initialQuestion' in sectionDetails && sectionDetails.initialQuestion) {
        historyForAnalysis = [
            ...historyForAnalysis, 
            { role: 'user', text: sectionDetails.initialQuestion, section }
        ];
    }

    const analysisResult = await getAnalysis(historyForAnalysis, sectionDetails.systemInstruction);

    setMessages(prev => [...prev.slice(0, -1), { role: 'model', text: analysisResult, section }]);
    setIsLoading(false);
  }, [messages, language, uiStrings]);

  useEffect(() => {
    if(currentSection > Section.Intro && currentSection < Section.Analysis) {
        setMessages([]);
        startNewConversation(currentSection);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);


  useEffect(() => {
    if (currentSection > Section.Intro && currentSection < Section.Analysis) {
      startNewConversation(currentSection);
    }
    if (currentSection === Section.Analysis || currentSection === Section.Results) {
      triggerAnalysis(currentSection);
    }
    if (currentSection === Section.Conclusion) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  const handleFinishSection = useCallback(async (currentMessages: Message[]) => {
    const sectionDetails = SECTIONS[language][currentSection];
    if ('summaryInstruction' in sectionDetails && sectionDetails.summaryInstruction) {
        const historyForSummary = currentMessages.filter(m => m.section === currentSection);
        const summaryText = await getSectionSummary(historyForSummary, sectionDetails.summaryInstruction);
        setMessages(prev => [...prev, { role: 'model', text: summaryText, section: currentSection }]);
        setIsLoading(false);
        setIsSectionComplete(true);
    } else {
        setIsLoading(false);
        handleNextSection();
    }
  }, [currentSection, handleNextSection, language]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: Message = { role: 'user', text: userInput, section: currentSection };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput('');
    setIsLoading(true);
    
    const updatedQuestionCount = questionCount + 1;
    setQuestionCount(updatedQuestionCount);

    if (updatedQuestionCount < 3 && currentSection < Section.Analysis) {
        const responseText = await sendMessageToAI(userInput);
        setMessages(prev => [...prev, { role: 'model', text: responseText, section: currentSection }]);
        setIsLoading(false);
    } else {
        await handleFinishSection(updatedMessages);
    }
  };

  const handleUserRequestsSummary = async () => {
    if(isLoading) return;
    setIsLoading(true);
    await handleFinishSection(messages);
  };
  
  const handleEditLastMessage = useCallback(() => {
    const lastUserMessageIndex = messages.map(m => m.role).lastIndexOf('user');
    if (lastUserMessageIndex === -1) return;

    const messageToEdit = messages[lastUserMessageIndex];
    
    setUserInput(messageToEdit.text);
    
    setMessages(prev => prev.slice(0, lastUserMessageIndex));

    setQuestionCount(prev => Math.max(0, prev - 1));
    
    inputRef.current?.focus();
  }, [messages]);

  const getContinueButtonText = () => {
    if (currentSection === Section.Analysis) return currentUiStrings.revealCareersButton;
    if (currentSection === Section.Results) return currentUiStrings.finishJourneyButton;
    return currentUiStrings.continueButton;
  };

  const currentSectionDetails = SECTIONS[language][currentSection];
  const currentUiStrings = uiStrings[language];
  const lastUserMessageIndex = messages.map(m => m.role).lastIndexOf('user');

  const renderMessage = (msg: Message, index: number) => {
    const botBubbleColor = getBotBubbleColor(msg.section);
    
    if (msg.role === 'user') {
      const canEdit = index === lastUserMessageIndex &&
                      currentSection < Section.Analysis &&
                      !isSectionComplete &&
                      !isLoading;
      return (
        <div key={index} className="flex items-end gap-2 my-4 justify-end">
          {canEdit && (
            <button
              onClick={handleEditLastMessage}
              title="Edit answer"
              aria-label="Edit last answer"
              className="p-1 text-gray-500 hover:text-white transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          )}
          <div className="max-w-md md:max-w-lg p-3 rounded-2xl bg-indigo-600 rounded-br-none">
            <p className="text-white whitespace-pre-wrap">{msg.text}</p>
          </div>
          <UserIcon />
        </div>
      );
    }

    return (
        <div key={index} className={`flex items-start gap-3 my-4 justify-start`}>
          <BotIcon />
          <div className={`max-w-md md:max-w-lg p-3 rounded-2xl ${botBubbleColor} rounded-bl-none`}>
              <p className="text-white whitespace-pre-wrap">{msg.text}</p>
          </div>
        </div>
    );
  };

  const renderIkigaiModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setIsIkigaiModalOpen(false)}>
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-w-lg w-full p-6 text-gray-300 animate-fade-in max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-400">{currentUiStrings.ikigaiConceptTitle}</h2>
        
        <p className="leading-relaxed my-4">{currentUiStrings.ikigaiConceptIntro}</p>
        
        <dl className="space-y-4 text-left text-sm">
          <div>
            <dt className="font-bold text-rose-400">{currentUiStrings.loveTitle}</dt>
            <dd className="pl-4 text-gray-400">{currentUiStrings.loveDesc}</dd>
          </div>
          <div>
            <dt className="font-bold text-lime-400">{currentUiStrings.skillsTitle}</dt>
            <dd className="pl-4 text-gray-400">{currentUiStrings.skillsDesc}</dd>
          </div>
          <div>
            <dt className="font-bold text-sky-400">{currentUiStrings.needsTitle}</dt>
            <dd className="pl-4 text-gray-400">{currentUiStrings.needsDesc}</dd>
          </div>
          <div>
            <dt className="font-bold text-amber-400">{currentUiStrings.paidForTitle}</dt>
            <dd className="pl-4 text-gray-400">{currentUiStrings.paidForDesc}</dd>
          </div>
        </dl>

        <p className="leading-relaxed mt-4">{currentUiStrings.ikigaiConceptOutro}</p>
        
        <button 
          onClick={() => setIsIkigaiModalOpen(false)}
          className="w-full mt-6 px-6 py-2 bg-indigo-600 rounded-full text-white font-semibold hover:bg-indigo-500 transition-colors duration-200">
          {currentUiStrings.closeButton}
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 font-sans">
      {isIkigaiModalOpen && renderIkigaiModal()}
      
      {/* Header with Flexbox for better spacing and no overlap */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700/50 shadow-lg bg-gray-800/50 backdrop-blur-sm z-10 relative">
        <div className="flex-1 flex justify-start">
            <button onClick={() => setIsIkigaiModalOpen(true)} className="hidden md:block px-3 py-1.5 text-sm font-semibold text-white bg-sky-600 rounded-full hover:bg-sky-500 transition-colors whitespace-nowrap">
              {currentUiStrings.whatIsIkigai}
            </button>
        </div>

        <div className="flex-[2] flex flex-col items-center justify-center text-center px-2">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-400">
            {currentSectionDetails.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm md:text-base">
            <p>{currentSectionDetails.description}</p>
            {'explanation' in currentSectionDetails && (
              <div className="group relative">
                <InfoIcon className="w-5 h-5 cursor-help" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 p-3 bg-gray-900 border border-gray-600 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  {(currentSectionDetails as any).explanation}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 flex justify-end">
          <button onClick={() => setLanguage(lang => lang === 'en' ? 'th' : 'en')} className="px-3 py-1 text-sm font-semibold text-gray-300 bg-gray-700/50 rounded-full hover:bg-gray-600/50 transition-colors">
            <span className={language === 'en' ? 'text-teal-300' : ''}>EN</span> / <span className={language === 'th' ? 'text-teal-300' : ''}>TH</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4 md:p-8 bg-gray-900 border-r-0 md:border-r border-gray-700/50">
          <IkigaiChart currentSection={currentSection} language={language} />
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col bg-gray-800">
          <div className="flex-1 p-4 overflow-y-auto">
            {currentSection === Section.Intro ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-300 px-4">
                <button 
                  onClick={() => setIsIkigaiModalOpen(true)}
                  className="text-base md:text-xl font-semibold mb-4 text-teal-300 hover:text-teal-200 underline decoration-dotted underline-offset-4 transition-colors">
                  {currentUiStrings.whatIsIkigai}
                </button>
                <p className="w-4/5 md:max-w-md mb-8 text-sm md:text-base">
                  {currentUiStrings.ikigaiExplanation}
                </p>
                <button 
                  onClick={handleNextSection}
                  className="px-8 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-full font-bold text-white hover:scale-105 transition-transform duration-300 shadow-lg">
                  {currentUiStrings.findButton}
                </button>
              </div>
            ) : (
              <>
                {messages.map(renderMessage)}
                {isLoading && (
                   <div className="flex items-start gap-3 my-4 justify-start">
                     <BotIcon />
                     <div className="max-w-md p-3 rounded-2xl bg-gray-700 rounded-bl-none">
                       <Spinner />
                     </div>
                   </div>
                )}
                <div ref={chatEndRef} />
              </>
            )}
          </div>
          
          {currentSection > Section.Intro && currentSection < Section.Conclusion && (
            <div className="p-4 border-t border-gray-700/50 bg-gray-900/50">
             { currentSection < Section.Analysis && !isSectionComplete ? (
               <>
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={currentUiStrings.placeholder}
                    className="flex-1 p-3 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    disabled={isLoading}
                    />
                    <button 
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className="p-3 bg-indigo-600 rounded-full text-white disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors duration-200">
                    <SendIcon className="w-6 h-6" />
                    </button>
                </form>
                <button 
                    onClick={handleUserRequestsSummary}
                    className="w-full mt-3 px-6 py-2 bg-teal-600 rounded-full text-white font-semibold hover:bg-teal-500 transition-colors duration-200 text-sm disabled:bg-gray-500 disabled:opacity-50"
                    disabled={isLoading || questionCount < 1}
                >
                    {currentUiStrings.moveOnButton}
                </button>
               </>
             ) : (
                !isLoading && (
                  <button 
                      onClick={handleNextSection}
                      className="w-full px-6 py-3 bg-indigo-600 rounded-full text-white font-bold hover:bg-indigo-500 transition-colors duration-200 disabled:bg-gray-500 disabled:opacity-50"
                  >
                      {getContinueButtonText()}
                  </button>
                )
             )}
            </div>
          )}

          {currentSection === Section.Conclusion && (
            <div className="p-4 border-t border-gray-700/50 bg-gray-900/50">
                <button 
                    onClick={() => window.location.reload()}
                    className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-full text-white font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                    {currentUiStrings.startOver}
                </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;