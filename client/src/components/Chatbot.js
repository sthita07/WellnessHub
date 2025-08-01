import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = ({ mood, moodEmoji }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const botName = "MoodyMate"; // You can rename it anytime

  // Initial greeting when mood is available
  useEffect(() => {
    if (mood) {
      setMessages([
        {
          sender: "bot",
          text: `Hi! I'm ${botName}. I see you're feeling ${moodEmoji || ""} ${mood}. Want some tips?`,
        },
      ]);
    }
  }, [mood, moodEmoji]);

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);

    try {
      const res = await axios.post("http://localhost:3000/api/chatbot", {
        message: userMessage,
        mood: mood,
      });

      setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error getting response. Try again." },
      ]);
    }

    setInput("");
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse"
      >
        🐤
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 flex justify-between items-center">
            <span className="font-bold text-lg flex items-center gap-2">
              🐤 {botName}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-2 bg-white/50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-sm max-w-[85%] ${
                  msg.sender === "bot"
                    ? "bg-gray-200 text-gray-800 self-start"
                    : "bg-blue-500 text-white self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 text-sm border-none focus:ring-0 rounded-bl-2xl"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 rounded-br-2xl"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
