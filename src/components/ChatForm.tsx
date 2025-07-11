import { useRef } from "react";

const ChatForm = ({ chatHistory,setChatHistory, generateBotResponse, topics }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
  e.preventDefault();
  const userMessage = inputRef.current.value.trim();
  if (!userMessage) return;

  const lowerCaseMsg = userMessage.toLowerCase();
  inputRef.current.value = "";

  setChatHistory(history => [
    ...history,
    { role: "user", text: userMessage }
  ]);

  if (topics[capitalize(lowerCaseMsg)]) {
    // Found in topics, reply directly
    setChatHistory(history => [
      ...history,
      { role: "model", text: topics[capitalize(lowerCaseMsg)] }
    ]);
  } else {
    // Not found — fallback to backend
    setChatHistory(history => [
      ...history,
      { role: "model", text: "Thinking..." }
    ]);
    generateBotResponse([
      ...chatHistory,
      { role: "user", text: userMessage }
    ]);
  }
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   const userMessage = inputRef.current.value.trim();
  //   if (!userMessage) {
  //     return;
  //   }
  //   inputRef.current.value = "";
  //   setChatHistory(history => [...history, {role: "user", text: userMessage}])

  //   setTimeout(() => setChatHistory(history => [...history, {role: "model", text: "Thinking..."}]),
  //   generateBotResponse([...chatHistory, { role: "user", text: `Using the details provided above, please address this query` }]), 600)
  // }
  return (
    <div>
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" name="" placeholder="Message..." className="message-input" required />
            <button className="material-symbols-outlined">
              arrow_upward
            </button>
        </form>
    </div>
  )
}

export default ChatForm
