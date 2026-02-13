import { Message } from '../types';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'google/gemini-2.0-flash-exp:free'; // Free model, you can change this

let chatHistory: Array<{ role: string; content: string }> = [];
let currentSystemInstruction: string = '';

const getApiKey = (): string => {
  if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
    throw new Error("VITE_OPENROUTER_API_KEY environment variable not set");
  }
  return import.meta.env.VITE_OPENROUTER_API_KEY;
};

const callOpenRouter = async (messages: Array<{ role: string; content: string }>): Promise<string> => {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getApiKey()}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Ikigai for Teens',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error calling OpenRouter:', error);
    throw error;
  }
};

export const startChat = (systemInstruction: string) => {
  currentSystemInstruction = systemInstruction;
  chatHistory = [];
};

export const sendMessageToAI = async (message: string): Promise<string> => {
  if (!currentSystemInstruction) {
    throw new Error("Chat not initialized. Call startChat first.");
  }
  
  try {
    chatHistory.push({ role: 'user', content: message });
    
    const messages = [
      { role: 'system', content: currentSystemInstruction },
      ...chatHistory
    ];
    
    const result = await callOpenRouter(messages);
    chatHistory.push({ role: 'assistant', content: result });
    
    return result;
  } catch (error) {
    console.error("Error sending message to OpenRouter:", error);
    return "Sorry, I encountered an error. Let's try that again.";
  }
};

export const getAnalysis = async (history: Message[], systemInstruction: string): Promise<string> => {
  const messages = [
    { role: 'system', content: systemInstruction },
    ...history.map(msg => ({
      role: msg.role === 'bot' ? 'assistant' : msg.role,
      content: msg.text
    }))
  ];
  
  try {
    const result = await callOpenRouter(messages);
    return result;
  } catch (error) {
    console.error("Error getting analysis from OpenRouter:", error);
    return "Sorry, I encountered an error while analyzing your responses. Let's try again.";
  }
};

export const getSectionSummary = async (history: Message[], systemInstruction: string): Promise<string> => {
  const messages = [
    { role: 'system', content: systemInstruction },
    ...history.map(msg => ({
      role: msg.role === 'bot' ? 'assistant' : msg.role,
      content: msg.text
    }))
  ];
  
  try {
    const result = await callOpenRouter(messages);
    return result;
  } catch (error) {
    console.error("Error getting summary from OpenRouter:", error);
    return "That's some great information! Let's move on to the next step.";
  }
};
