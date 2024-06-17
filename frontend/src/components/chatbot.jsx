import React, { useState } from 'react';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);

    setInput('');

    // Simuler une réponse après un délai
    setTimeout(() => {
      const botMessage = { sender: 'bot', text: 'Ceci est une réponse simulée.' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Tapez un message..."
        />
        <button onClick={handleSendMessage}>Envoyer</button>
      </div>
    </div>
  );
};

export default Chatbot;
