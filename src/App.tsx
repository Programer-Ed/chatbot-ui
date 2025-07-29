import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { topics } from "./topicInfo";
import type { ChatMessageType } from "./components/types";
import { ChatSuggestions } from "./components/suggestion/ChatSuggestion";

function App() {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([
    {
      hideInChat: true,
      role: "model",
      text: `Hey 👋! Pick a topic to know more:\n\n${Object.keys(topics).join(", ")}`,
    },
  ]);

  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const generateBotResponse = async (history: ChatMessageType[]) => {
  const updateHistory = (text: string, isError = false) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text !== "Thinking..."),
      { role: "model", text, hideInChat: false, isError },
    ]);
  };

  const latestUserMessage = history.filter((msg) => msg.role === "user").at(-1)?.text ?? "";
  const lowerMsg = latestUserMessage.toLowerCase();

  const matchedTopic = Object.keys(topics).find((key) => lowerMsg.includes(key.toLowerCase()));

  let customSystemPrompt: string;

  if (matchedTopic) {
  customSystemPrompt = `
You are a portfolio chatbot named GojoBot, representing a full-stack developer.

📌 The user just asked about: "${matchedTopic}"

🧠 Here is the official info straight from his portfolio:
---
${topics[matchedTopic as keyof typeof topics]}
---

🎯 Your job:
- Use ONLY the above content to answer.
- Don’t invent or generalize — personalize.
- Expand or clarify only if needed, but stay grounded in the provided data.
- Keep the tone witty, warm, and confident — like a developer who watches anime and writes elegant code.
- Be concise but engaging — no dry textbook replies.
`.trim();
} else {
  customSystemPrompt = `
You are GojoBot — a friendly, clever AI chatbot helping users explore a developer's portfolio.

When answering questions, use the structured data available in the portfolio. If unsure or if the topic isn’t matched, ask the user to clarify.

Speak in a human tone — informative but with charm and chill energy.
`.trim();
}
// console.log("🧠 Final System Prompt:", customSystemPrompt);

  const requestBody = [
    { role: "user", parts: [{ text: `Instruction: ${customSystemPrompt}` }] },
    { role: "user", parts: [{ text: latestUserMessage }] },
  ];

  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: requestBody }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message || "Something went wrong!");

    const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
    updateHistory(apiResponseText);
  } catch (error) {
    updateHistory((error as Error).message, true);
  }
};
  
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>

      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-outlined">
            keyboard_arrow_down
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">Hey there 👋 <br /> How can I help you today?</p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatSuggestions
        //   onSend={async (prompt) => {
        //   const userMessage = { role: "user", text: prompt, hideInChat: false };
        //   const thinkingMsg = { role: "model", text: "Thinking...", hideInChat: false };
        //   const updatedHistory = [...chatHistory, userMessage, thinkingMsg];

        //   setChatHistory(updatedHistory);

        //   setTimeout(() => {
        //     generateBotResponse(updatedHistory);
        //   }, 500);
        // }}

        onSend={async (prompt) => {
  const userMessage: ChatMessageType = { role: "user", text: prompt, hideInChat: false };
  const thinkingMsg: ChatMessageType = { role: "model", text: "Thinking...", hideInChat: false };
  const updatedHistory: ChatMessageType[] = [...chatHistory, userMessage, thinkingMsg];

  setChatHistory(updatedHistory);
  generateBotResponse(updatedHistory);
}}

//         onSend={async (prompt) => {
//   const userMessage = { role: "user", text: prompt, hideInChat: false };
//   const thinkingMsg = { role: "model", text: "Thinking...", hideInChat: false };
//   const updatedHistory = [...chatHistory, userMessage, thinkingMsg];

//   setChatHistory(updatedHistory);
//   generateBotResponse(updatedHistory);
// }}

        //   onSend={async (prompt) => {
        //   const userMessage = { role: "user", text: prompt, hideInChat: false };

        //   setChatHistory((prev) => [
        //     ...prev,
        //     userMessage,
        //     { role: "model", text: "Thinking...", hideInChat: false },
        //   ]);

        //   setTimeout(() => {
        //     generateBotResponse([...chatHistory, userMessage]);
        //   }, 500);
        // }}

        />
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
            topics={topics}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
