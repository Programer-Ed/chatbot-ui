
import { useRef } from "react";
import type { ChatMessageType } from "./types";

type ChatFormProps = {
  chatHistory: ChatMessageType[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  generateBotResponse: (history: ChatMessageType[]) => Promise<void>;
  topics: Record<string, string>;
};

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse, topics }: ChatFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = inputRef.current?.value.trim();
    if (!userMessage) return;

    const lowerCaseMsg = userMessage.toLowerCase();
    // inputRef.current.value = "";
    if (inputRef.current) {
  inputRef.current.value = "";
}

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage, hideInChat: false }
    ]);

    const capitalizedKey = capitalize(lowerCaseMsg);

    if (topics[capitalizedKey]) {
      // Match found in topics
      setChatHistory((history) => [
        ...history,
        { role: "model", text: topics[capitalizedKey], hideInChat: false }
      ]);
    } else {
      // No match: fallback
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking...", hideInChat: false }
      ]);

      generateBotResponse([
        ...chatHistory,
        { role: "user", text: userMessage, hideInChat: false }
      ]);
    }
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button className="material-symbols-outlined">arrow_upward</button>
    </form>
  );
};

export default ChatForm;
