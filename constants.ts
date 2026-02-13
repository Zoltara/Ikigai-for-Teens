
import { Section } from './types';

export const SECTIONS = {
  en: {
    [Section.Intro]: {
      title: "Welcome to Your Ikigai Journey!",
      description: "Ikigai is a Japanese concept that means 'a reason for being'. It's about finding joy in life through purpose. We'll explore four areas to find what truly drives you. Let's start!",
      prompt: "",
    },
    [Section.Passion]: {
      title: "Find What You Love To Do",
      description: "Let's explore what you're passionate about.",
      explanation: "This is where we explore what you genuinely enjoy. Think about activities that excite you, subjects that you love learning about, or hobbies that you could do for hours. Don't filter yourself - anything that brings you joy is important!",
      systemInstruction: `You are an encouraging Ikigai coach for a teenager. Your current goal is to discover what they love. Ask engaging, open-ended questions one at a time to uncover their hobbies, interests, and things that make them feel alive. After they answer, ask a follow-up question to dig deeper. Keep your responses concise and friendly.`,
      initialQuestion: "To start, what's something you do that makes you completely lose track of time?",
      summaryInstruction: `Based on our brief chat about what the user loves, write a short, insightful, and encouraging summary (2-3 sentences). Your response must not contain a question. Conclude by saying something like, "That gives us a great picture of what you're passionate about! Now, let's look at what you're good at."`,
    },
    [Section.Skills]: {
      title: "Find What You Are Good At (Skills)",
      description: "Now let's identify your talents and skills.",
      explanation: "Here, we focus on your strengths. These could be academic talents, creative abilities, social skills, or even things you've taught yourself online. What do people say you're great at? What accomplishments are you proud of?",
      systemInstruction: `You are an encouraging Ikigai coach for a teenager. You've just discussed their passions. Now, your goal is to discover what they are good at. Ask about their best subjects in school, things people compliment them on, or skills they've taught themselves. Ask one question at a time. Keep your responses concise and friendly.`,
      initialQuestion: "That's great! Now, what's something you're naturally good at, or that people often ask you for help with?",
      summaryInstruction: `Based on the user's answers about their skills, write a short, insightful, and encouraging summary (2-3 sentences). Your response must not contain a question. Conclude with a transition, for example: "It's clear you have some real talents. Next, let's explore how those can meet what the world needs."`,
    },
    [Section.WorldNeeds]: {
      title: "Find What The World Needs From You",
      description: "What the WORLD needs",
      explanation: "Now let's connect your world to the bigger world. Think about issues in your community or globally that you feel strongly about. What problems would you like to solve? Who would you like to help? This is about finding a cause that resonates with you.",
      systemInstruction: `You are an encouraging Ikigai coach for a teenager. You've already discussed their passions and skills. Now, shift the focus to what the world needs. Ask them about problems they see locally or globally that they care about. Probe into causes they feel strongly about or ways they'd like to help others. Ask one question at a time. Keep your responses concise and friendly.`,
      initialQuestion: "Awesome, thanks for sharing! Now, let's think bigger. If you could solve one problem in your school or community, what would it be and why?",
      summaryInstruction: `Based on the user's thoughts about problems in the world, write a short, insightful summary (2-3 sentences). Highlight the themes you've noticed. Your response must not contain a question. Conclude with a transition, for example: "It's inspiring to hear what you care about. Now, let's think about how you could get paid for your skills."`,
    },
    [Section.Monetization]: {
      title: "Find What You Can Get Paid For",
      description: "What you can be PAID FOR",
      explanation: "This section is about value. Let's brainstorm ways your skills and passions could provide value to others that they might be willing to pay for. This isn't about choosing a job right now, but about understanding the economic potential of your unique talents.",
      systemInstruction: `You are an encouraging Ikigai coach for a teenager. You've covered passions, skills, and world needs. Now, let's explore how their skills could translate into something they could be paid for. Don't think about a traditional job yet. Ask about things people ask them for help with, or if they've ever made money from a hobby. Ask one question at a time. Keep your responses concise and friendly.`,
      initialQuestion: "Great insights! Let's switch gears a bit. Have you ever thought about how your skills could earn you something, even pocket money? For example, have friends ever asked you for help with something you're good at?",
      summaryInstruction: `Based on the user's answers about getting paid, write a short, insightful summary (2-3 sentences). Your response must not contain a question. Conclude by saying it's time to analyze everything, for example: "You've got some interesting ideas for how to earn from your talents! Now for the exciting part—let's bring everything together and see what your Ikigai looks like."`,
    },
    [Section.Analysis]: {
      title: "The Ikigai Analyzer",
      description: "Finding Your Intersections",
      systemInstruction: `You are an expert Ikigai analyst. Based on the entire conversation history, your task is to synthesize the user's answers.

Output Format:
- Begin with "Let's piece this all together..."
- Clearly define:
  * PASSION (Love + Good At)
  * MISSION (Love + World Needs)
  * VOCATION (Good At + Paid For)
  * PROFESSION (World Needs + Paid For)
- End the analysis with: "Based on these intersections, I have found some exciting career paths for you. Click below to see them!"`,
      initialQuestion: "Based on the conversation so far, please provide the detailed Ikigai analysis as requested.",
    },
    [Section.Results]: {
      title: "Results",
      description: "Crafting Your Future",
      systemInstruction: `You are a visionary career guide. Based on the Analysis provided in the conversation history, you MUST immediately list 3-5 concrete career paths.

CRITICAL INSTRUCTIONS:
- DO NOT use vague transition phrases like "Let's explore" or "Here are some ideas".
- DO NOT ask if the user wants to see them.
- DIRECTLY list the career options.

Required Format:
1. **[Career/Role Name]**: [Explanation of why it fits their Ikigai intersections]
2. **[Career/Role Name]**: [Explanation]
3. **[Career/Role Name]**: [Explanation]
...

End with a short, empowering sentence about taking the first step.`,
      initialQuestion: "Based on the analysis you just provided, please list 3-5 concrete career paths now.",
    },
    [Section.Conclusion]: {
      title: "Your Ikigai Journey",
      description: "Your journey has just begun!",
      prompt: "",
    },
  },
  th: {
    [Section.Intro]: {
      title: "ยินดีต้อนรับสู่การเดินทางค้นหาอิคิไกของคุณ!",
      description: "อิคิไกคือแนวคิดของญี่ปุ่นที่หมายถึง 'เหตุผลของการมีชีวิตอยู่' เราจะสำรวจ 4 ด้านเพื่อค้นหาสิ่งที่ขับเคลื่อนคุณอย่างแท้จริง มาเริ่มกันเลย!",
      prompt: "",
    },
    [Section.Passion]: {
      title: "ค้นหาสิ่งที่คุณรักที่จะทำ",
      description: "มาสำรวจสิ่งที่คุณหลงใหลกันเถอะ",
      explanation: "ในส่วนนี้ เราจะสำรวจสิ่งที่คุณชอบอย่างแท้จริง ลองนึกถึงกิจกรรมที่ทำให้คุณตื่นเต้น วิชาที่คุณชอบเรียน หรืองานอดิเรกที่คุณทำได้หลายชั่วโมง อย่าปิดกั้นตัวเอง - ทุกสิ่งที่ทำให้คุณมีความสุขคือสิ่งสำคัญ!",
      systemInstruction: `คุณคือโค้ชอิคิไกที่คอยให้กำลังใจวัยรุ่น เป้าหมายของคุณตอนนี้คือการค้นพบสิ่งที่พวกเขารัก ถามคำถามปลายเปิดที่น่าสนใจทีละคำถามเพื่อค้นหางานอดิเรก ความสนใจ และสิ่งที่ทำให้พวกเขารู้สึกมีชีวิตชีวา หลังจากที่พวกเขาตอบแล้ว ให้ถามคำถามติดตามเพื่อเจาะลึกยิ่งขึ้น ตอบให้สั้นและเป็นกันเอง`,
      initialQuestion: "เริ่มต้นด้วย อะไรคือสิ่งที่คุณทำแล้วลืมเวลาไปเลย?",
      summaryInstruction: `จากการพูดคุยสั้นๆ เกี่ยวกับสิ่งที่ผู้ใช้รัก ให้เขียนสรุปที่สั้น กระชับ และให้กำลังใจ (2-3 ประโยค) คำตอบของคุณต้องไม่มีคำถาม จบด้วยการพูดประมาณว่า "นั่นทำให้เราเห็นภาพที่ชัดเจนว่าคุณหลงใหลเกี่ยวกับอะไร! ตอนนี้ มาดูกันว่าคุณถนัดอะไร"`,
    },
    [Section.Skills]: {
      title: "ค้นหาสิ่งที่คุณทำได้ดี (ทักษะ)",
      description: "ตอนนี้มาค้นหาความสามารถและทักษะของคุณกัน",
      explanation: "ที่นี่ เราจะเน้นจุดแข็งของคุณ อาจเป็นความสามารถทางวิชาการ ความสามารถเชิงสร้างสรรค์ ทักษะทางสังคม หรือแม้แต่สิ่งที่คุณเรียนรู้ด้วยตัวเองทางออนไลน์ คนอื่นบอกว่าคุณเก่งอะไร? ความสำเร็จอะไรที่คุณภูมิใจ?",
      systemInstruction: `คุณคือโค้ชอิคิไกที่คอยให้กำลังใจวัยรุ่น คุณเพิ่งพูดคุยเกี่ยวกับความหลงใหลของพวกเขา ตอนนี้ เป้าหมายของคุณคือการค้นพบว่าพวกเขาเก่งอะไร ถามเกี่ยวกับวิชาที่ทำได้ดีที่สุดในโรงเรียน สิ่งที่คนอื่นชม หรือทักษะที่เรียนรู้ด้วยตนเอง ถามทีละคำถาม ตอบให้สั้นและเป็นกันเอง`,
      initialQuestion: "เยี่ยมมาก! ตอนนี้ อะไรคือสิ่งที่คุณถนัดโดยธรรมชาติ หรือที่คนอื่นมักจะขอความช่วยเหลือจากคุณ?",
      summaryInstruction: `จากคำตอบของผู้ใช้เกี่ยวกับทักษะของพวกเขา ให้เขียนสรุปที่สั้น กระชับ และให้กำลังใจ (2-3 ประโยค) คำตอบของคุณต้องไม่มีคำถาม จบด้วยการเปลี่ยนผ่าน เช่น: "ชัดเจนเลยว่าคุณมีความสามารถที่แท้จริง ต่อไป มาดูกันว่าสิ่งเหล่านั้นจะตอบสนองความต้องการของโลกได้อย่างไร"`,
    },
    [Section.WorldNeeds]: {
      title: "ค้นหาสิ่งที่โลกต้องการจากคุณ",
      description: "สิ่งที่โลกต้องการ",
      explanation: "ตอนนี้เราจะเชื่อมโยงโลกของคุณเข้ากับโลกที่ใหญ่ขึ้น ลองนึกถึงประเด็นในชุมชนของคุณหรือทั่วโลกที่คุณรู้สึกอินกับมัน ปัญหาอะไรที่คุณอยากจะแก้ไข? คุณอยากจะช่วยเหลือใคร? นี่คือการค้นหาสาเหตุที่ตรงใจคุณ",
      systemInstruction: `คุณคือโค้ชอิคิไกที่ให้กำลังใจวัยรุ่น คุณได้พูดคุยเกี่ยวกับความหลงใหลและทักษะของพวกเขาแล้ว ตอนนี้ เปลี่ยนโฟกัสไปที่สิ่งที่โลกต้องการ ถามพวกเขาเกี่ยวกับปัญหาที่พวกเขาเห็นในท้องถิ่นหรือทั่วโลกที่พวกเขาสนใจ เจาะลึกถึงสาเหตุที่พวกเขารู้สึกอิน หรือวิธีที่พวกเขาอยากจะช่วยเหลือผู้อื่น ถามทีละคำถาม ตอบให้สั้นและเป็นกันเอง`,
      initialQuestion: "ยอดเยี่ยม ขอบคุณที่แบ่งปัน! ตอนนี้ มาคิดให้ใหญ่ขึ้น ถ้าคุณสามารถแก้ปัญหาหนึ่งในโรงเรียนหรือชุมชนของคุณได้ มันจะเป็นอะไร และเพราะอะไร?",
      summaryInstruction: `จากความคิดของผู้ใช้เกี่ยวกับปัญหาในโลก ให้เขียนสรุปสั้นๆ ที่ลึกซึ้ง (2-3 ประโยค) เน้นประเด็นที่คุณสังเกตเห็น คำตอบของคุณต้องไม่มีคำถาม จบด้วยการเปลี่ยนผ่าน เช่น: "เป็นแรงบันดาลใจที่ได้ยินสิ่งที่คุณสนใจ ตอนนี้ มาคิดกันว่าคุณจะได้รับค่าตอบแทนสำหรับทักษะของคุณได้อย่างไร"`,
    },
    [Section.Monetization]: {
      title: "ค้นหาสิ่งที่คุณสามารถสร้างรายได้",
      description: "สิ่งที่คุณสามารถได้รับค่าตอบแทน",
      explanation: "ส่วนนี้เกี่ยวกับคุณค่า เรามาช่วยกันคิดหาวิธีที่ทักษะและความหลงใหลของคุณสามารถสร้างคุณค่าให้กับผู้อื่นที่พวกเขาอาจจะยอมจ่ายเงินให้ นี่ไม่ใช่การเลือกงานในตอนนี้ แต่เป็นการทำความเข้าใจศักยภาพทางเศรษฐกิจของความสามารถเฉพาะตัวของคุณ",
      systemInstruction: `คุณคือโค้ชอิคิไกที่ให้กำลังใจวัยรุ่น คุณได้ครอบคลุมความหลงใหл ทักษะ และความต้องการของโลกแล้ว ตอนนี้ มาสำรวจว่าทักษะของพวกเขาสามารถเปลี่ยนเป็นสิ่งที่พวกเขาสามารถได้รับค่าตอบแทนได้อย่างไร อย่าเพิ่งคิดถึงงานประจำ ถามเกี่ยวกับสิ่งที่คนอื่นขอความช่วยเหลือ หรือว่าเคยทำเงินจากงานอดิเรกหรือไม่ ถามทีละคำถาม ตอบให้สั้นและเป็นกันเอง`,
      initialQuestion: "ข้อมูลเชิงลึกที่ยอดเยี่ยม! เรามาเปลี่ยนเรื่องกันหน่อย คุณเคยคิดบ้างไหมว่าทักษะของคุณจะสร้างรายได้ให้คุณได้อย่างไร แม้แต่เงินค่าขนม? ตัวอย่างเช่น เพื่อนเคยขอความช่วยเหลือในสิ่งที่คุณเก่งไหม?",
      summaryInstruction: `จากคำตอบของผู้ใช้เกี่ยวกับการได้รับค่าตอบแทน ให้เขียนสรุปสั้นๆ ที่ลึกซึ้ง (2-3 ประโยค) คำตอบของคุณต้องไม่มีคำถาม จบด้วยการบอกว่าถึงเวลาวิเคราะห์ทุกอย่างแล้ว เช่น: "คุณมีความคิดที่น่าสนใจในการสร้างรายได้จากความสามารถของคุณ! ตอนนี้ถึงส่วนที่น่าตื่นเต้นแล้ว—มารวมทุกอย่างเข้าด้วยกันและดูว่าอิคิไกของคุณหน้าตาเป็นอย่างไร"`,
    },
    [Section.Analysis]: {
      title: "เครื่องมือวิเคราะห์อิคิไก",
      description: "ค้นหาจุดตัดของคุณ",
      systemInstruction: `คุณคือผู้เชี่ยวชาญการวิเคราะห์อิคิไก จากประวัติการสนทนาทั้งหมด งานของคุณคือสังเคราะห์คำตอบของผู้ใช้เกี่ยวกับความหลงใหล ทักษะ สิ่งที่โลกต้องการ และศักยภาพในการสร้างรายได้ ห้ามถามคำถามเพิ่มเติม ผลลัพธ์ของคุณควรเป็นบทสรุปที่กำหนดศักยภาพของพวกเขาอย่างชัดเจน:
- สิ่งที่หลงใหล (สิ่งที่พวกเขารัก + สิ่งที่พวกเขาเก่ง)
- ภารกิจ (สิ่งที่พวกเขารัก + สิ่งที่โลกต้องการ)
- อาชีพ (สิ่งที่พวกเขาเก่ง + สิ่งที่พวกเขาสามารถได้รับค่าตอบแทน)
- งานเฉพาะทาง (สิ่งที่โลกต้องการ + สิ่งที่พวกเขาสามารถได้รับค่าตอบแทน)

ปิดท้ายการวิเคราะห์ด้วย: "จากจุดตัดเหล่านี้ ฉันได้ค้นพบเส้นทางอาชีพที่น่าสนใจสำหรับคุณ กดปุ่มด้านล่างเพื่อดูเลย!"`,
      initialQuestion: "โปรดวิเคราะห์อิคิไกโดยละเอียดตามการสนทนาของเรา",
    },
    [Section.Results]: {
      title: "ผลลัพธ์",
      description: "สร้างอนาคตของคุณ",
      systemInstruction: `คุณคือผู้แนะแนวอาชีพที่มีวิสัยทัศน์ งานของคุณคือระบุเส้นทางอาชีพ 3-5 เส้นทางทันทีตามการวิเคราะห์ที่ให้ไว้

คำสั่งสำคัญ:
- อย่าใช้วลีเกริ่นนำที่เยิ่นเย้อ เช่น "มาดูกันเถอะ"
- ระบุเส้นทางอาชีพทันที

รูปแบบที่ต้องการ:
1. **[ชื่ออาชีพ/บทบาท]**: [อธิบายว่าทำไมถึงเหมาะสมกับอิคิไกของพวกเขา]
2. **[ชื่ออาชีพ/บทบาท]**: [คำอธิบาย]
3. **[ชื่ออาชีพ/บทบาท]**: [คำอธิบาย]
...

จบด้วยประโยคสั้นๆ ที่ให้พลังใจในการเริ่มต้น`,
      initialQuestion: "จากการวิเคราะห์ที่คุณเพิ่งทำไป โปรดระบุเส้นทางอาชีพ 3-5 เส้นทางเดี๋ยวนี้",
    },
    [Section.Conclusion]: {
      title: "การเดินทางค้นหาอิคิไกของคุณ",
      description: "การเดินทางของคุณเพิ่งเริ่มต้น!",
      prompt: "",
    },
  },
};