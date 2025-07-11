import { useEffect, useRef, useState } from "react"
import ChatbotIcon from "./components/ChatbotIcon"
import ChatForm from "./components/ChatForm"
import ChatMessage from "./components/ChatMessage";
import { topics } from "./topicInfo.js";

function App() {
  const [chatHistory, setChatHistory] =useState([{
    hideInChat: true,
    role: "model",
    text: `Hey 👋! Pick a topic to know more:\n\n${Object.keys(topics).join(", ")}`
}]);
  const [showChatbot, setShowChatbot] = useState([false])
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text}])
    }

    history = history.map(({role, text}) => ({role, parts: [{text}]}));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({contents: history})
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL,requestOptions);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
      // console.log(data);
    } catch(error){
      // console.error(error);
      updateHistory(error.message, true)
    }
  }
  useEffect(()=>{
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
  }, [chatHistory])
  return (
    <>
     <div className={`container ${showChatbot ? 'show-chatbot' : ''}`}>
      <button onClick={() => setShowChatbot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-outlined">
          mode_comment
        </span>
        <span className="material-symbols-outlined">
          close
        </span>
      </button>

      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon/>
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot(prev => !prev)} className="material-symbols-outlined">
              keyboard_arrow_down
          </button>
        </div>
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon/>
            <p className="message-text">
              Hey there 👋 <br /> How can i help you today?
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat}/>
          ))}

        </div>
        <div className="chat-footer">
          <ChatForm topics={topics} chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>
      </div>
     </div> 
    </>
  )
}

export default App
