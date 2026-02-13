import React from 'react';
import { Section } from '../types';

interface IkigaiChartProps {
  currentSection: Section;
  language: 'en' | 'th';
}

const chartLabels = {
  en: {
    love: ['What you', 'LOVE'],
    needs: ['What the world', 'NEEDS'],
    paidFor: ['What you can be', 'PAID FOR'],
    goodAt: ['What you are', 'GOOD AT'],
    passion: 'PASSION',
    mission: 'MISSION',
    vocation: 'VOCATION',
    profession: 'PROFESSION',
  },
  th: {
    love: ['สิ่งที่คุณ', 'รัก'],
    needs: ['สิ่งที่โลก', 'ต้องการ'],
    paidFor: ['สิ่งที่สร้าง', 'รายได้'],
    goodAt: ['สิ่งที่คุณ', 'ถนัด'],
    passion: 'สิ่งที่หลงใหล',
    mission: 'ภารกิจ',
    vocation: 'อาชีพ',
    profession: 'งานเฉพาะทาง',
  }
};

const Circle: React.FC<{ children: React.ReactNode; className: string; ringColor: string; isActive: boolean }> = ({ children, className, ringColor, isActive }) => {
  const activeClasses = isActive ? `opacity-100 scale-110 shadow-lg ring-4 ring-offset-4 ring-offset-gray-900 ${ringColor}` : 'opacity-60 scale-100';
  return (
    <div className={`absolute w-32 h-32 md:w-48 md:h-48 rounded-full flex p-2 text-sm md:text-base font-bold transition-all duration-500 ${className} ${activeClasses}`}>
      {children}
    </div>
  );
};

const Intersection: React.FC<{ text: string; className: string; isActive: boolean }> = ({ text, className, isActive }) => {
    const activeClasses = isActive ? 'opacity-100' : 'opacity-50';
    return (
        <div className={`absolute text-xs md:text-sm font-semibold transition-opacity duration-500 transform ${className} ${activeClasses}`}>
            {text}
        </div>
    );
};

const IkigaiChart: React.FC<IkigaiChartProps> = ({ currentSection, language }) => {
  const isPassionActive = currentSection === Section.Passion || currentSection >= Section.Analysis;
  const isWorldNeedsActive = currentSection === Section.WorldNeeds || currentSection >= Section.Analysis;
  const isPaidForActive = currentSection === Section.Monetization || currentSection >= Section.Analysis;
  const isGoodAtActive = currentSection === Section.Skills || currentSection >= Section.Analysis;
  const isAnalysisActive = currentSection >= Section.Analysis;

  const labels = chartLabels[language];

  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center my-8">
      <Circle className="bg-rose-500 top-0 flex-col items-center justify-start text-center pt-2 md:pt-4" isActive={isPassionActive} ringColor="ring-rose-400">
        <div className="flex flex-col leading-tight">
            <span>{labels.love[0]}</span>
            <span className="text-lg md:text-xl">{labels.love[1]}</span>
        </div>
      </Circle>
      
      <Circle className="bg-sky-500 right-0 items-center justify-end text-right pr-2 md:pr-4" isActive={isWorldNeedsActive} ringColor="ring-sky-400">
            <div className="flex flex-col leading-tight">
                <span>{labels.needs[0]}</span>
                <span className="text-lg md:text-xl">{labels.needs[1]}</span>
            </div>
      </Circle>

      <Circle className="bg-amber-500 bottom-0 flex-col items-center justify-end text-center pb-2 md:pb-4" isActive={isPaidForActive} ringColor="ring-amber-400">
         <div className="flex flex-col leading-tight">
            <span>{labels.paidFor[0]}</span>
            <span className="text-lg md:text-xl">{labels.paidFor[1]}</span>
        </div>
      </Circle>

      <Circle className="bg-lime-500 left-0 items-center justify-start text-left pl-2 md:pl-4" isActive={isGoodAtActive} ringColor="ring-lime-400">
            <div className="flex flex-col leading-tight">
                <span>{labels.goodAt[0]}</span>
                <span className="text-lg md:text-xl">{labels.goodAt[1]}</span>
            </div>
      </Circle>
      
      <Intersection text={labels.passion} className="top-[28%] left-[28%] -translate-x-1/2 -translate-y-1/2 text-black" isActive={isAnalysisActive} />
      <Intersection text={labels.mission} className="top-[28%] right-[28%] translate-x-1/2 -translate-y-1/2 text-black" isActive={isAnalysisActive} />
      <Intersection text={labels.vocation} className="bottom-[28%] left-[28%] -translate-x-1/2 translate-y-1/2 text-black" isActive={isAnalysisActive} />
      <Intersection text={labels.profession} className="bottom-[28%] right-[28%] translate-x-1/2 translate-y-1/2 text-black" isActive={isAnalysisActive} />

      <div className={`absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-center font-extrabold text-xl md:text-3xl transition-all duration-500 ${isAnalysisActive ? 'scale-110 opacity-100' : 'scale-100 opacity-80'}`}>
        {language === 'en' ? 'IKIGAI' : 'อิคิไก'}
      </div>
    </div>
  );
};

export default IkigaiChart;