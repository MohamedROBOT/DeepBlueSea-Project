import React, { useState, useEffect, useRef } from "react";
import { callGemini, getRecommendations } from "./ChatbotApi";
import { FiX, FiSend } from "react-icons/fi";
import { TbMessageChatbot } from "react-icons/tb";
import Logo from "../../assets/images/logo.png";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved
      ? JSON.parse(saved)
      : [
          {
            role: "bot",
            text: "Hello! I'm your Shark AI assistant 🦈🌊. Ask me anything about sharks or the ocean!",
          },
        ];
  });
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom function
  const scrollToBottom = (behavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  };

  // Scroll to last message on page reload
  useEffect(() => {
    scrollToBottom("auto"); // immediate scroll on first load
    getRecommendations(setRecommendations);
  }, []);

  // Save messages and scroll when messages update
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    scrollToBottom(); // smooth scroll when new messages added
  }, [messages]);

  const handleAsk = async (customQuestion) => {
    const userQuestion = customQuestion || question;
    if (!userQuestion.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: userQuestion }]);
    setQuestion("");
    setLoading(true);

    let botAnswer = "";
    await callGemini(userQuestion, (reply) => {
      botAnswer = reply;
    });

    setMessages((prev) => [...prev, { role: "bot", text: botAnswer }]);
    setLoading(false);

    getRecommendations(setRecommendations);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const handleClearChat = () => {
    const startMsg = {
      role: "bot",
      text: "Hello! I'm your Shark AI assistant 🦈🌊. Ask me anything about sharks or the ocean!",
    };
    setMessages([startMsg]);
    localStorage.setItem("chatMessages", JSON.stringify([startMsg]));
    scrollToBottom("auto"); // scroll to start message
  };

  return (
    <div className='z-30'>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='fixed bottom-6 cursor-pointer right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition'>
          <TbMessageChatbot size={24} />
        </button>
      )}

      {isOpen && (
        <div className='fixed bottom-6 right-6 w-80 bg-[#0d1b2a] text-white rounded-xl shadow-2xl flex flex-col h-[450px]'>
          {/* Header */}
          <div className='flex justify-between items-center p-3 border-b border-gray-700'>
            <div className='flex flex-row-reverse items-center gap-x-2'>
              <h2 className='font-semibold'> Shark AI</h2>
              <img src={Logo} className='size-5' />
            </div>
            <div className='flex items-center gap-x-2'>
              <button
                onClick={() => setIsOpen(false)}
                className='text-gray-400 hover:text-white cursor-pointer'>
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className='p-5 flex flex-col flex-1 overflow-y-auto text-sm space-y-3'>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md ${
                  msg.role === "bot"
                    ? "bg-blue-900/50 me-12 text-left self-start"
                    : "bg-blue-600 ms-12 self-end text-right"
                }`}>
                {msg.text}
              </div>
            ))}

            <div ref={messagesEndRef} /> {/* Scroll target */}

            {loading && (
              <div className='text-gray-400 text-xs flex items-center space-x-1'>
                <span>Shark AI is typing</span>
                <span className='flex space-x-1'>
                  <span className='animate-bounce'>.</span>
                  <span className='animate-bounce delay-200'>.</span>
                  <span className='animate-bounce delay-400'>.</span>
                </span>
              </div>
            )}

            {!loading && !question && recommendations.length > 0 && (
              <div className='px-3 text-[13px] text-silver p-5 flex flex-wrap gap-2'>
                Suggested Questions
                {recommendations.map((rec, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(rec)}
                    className='border text-white border-silver/50 text-start px-2 py-1 text-xs rounded hover:bg-gray-700'>
                    {rec}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className='p-3 border-t border-gray-700 flex items-center space-x-2'>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={1}
              placeholder='Ask about sharks...'
              className='flex-1 p-1 ps-3 text-sm rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none resize-none'
              disabled={loading}
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading}
              className='bg-blue-600 p-2 rounded-md cursor-pointer hover:bg-blue-700 transition disabled:opacity-50'>
              <FiSend size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
