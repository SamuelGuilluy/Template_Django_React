import React, { useState } from 'react';
import api from "../api";
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [comments, setComments] = useState({});
  const [votes, setVotes] = useState({});

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { id: messages.length, sender: 'user', text: input, upvotes: 0, downvotes: 0 };
    setMessages([...messages, newMessage]);

    setInput('');

    try {
      const response = await api.post('/api/chatbot/send_message/', { message: input });
      const botMessage = { id: messages.length + 1, sender: 'bot', text: response.data.message, upvotes: 0, downvotes: 0 };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API:', error);
      const errorMessage = { id: messages.length + 1, sender: 'bot', text: 'Erreur lors de l\'appel à l\'API.', upvotes: 0, downvotes: 0 };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleVote = async (id, type) => {
    if (votes[id] === type) return; // User can't vote the same type again

    const newVotes = { ...votes, [id]: type };
    setVotes(newVotes);

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              upvotes: type === 'up' ? msg.upvotes + 1 : msg.upvotes - (votes[id] === 'up' ? 1 : 0),
              downvotes: type === 'down' ? msg.downvotes + 1 : msg.downvotes - (votes[id] === 'down' ? 1 : 0),
            }
          : msg
      )
    );

    try {
      await api.post('/api/vote/', { id, type });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du vote:', error);
    }
  };

  const handleCommentChange = (id, comment) => {
    setComments({ ...comments, [id]: comment });
  };

  const handleAddComment = async (id) => {
    const comment = comments[id];
    if (!comment) return;

    try {
      await api.post('/api/comment/', { id, comment });
      console.log(`Commentaire ajouté au message ${id}: ${comment}`);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du commentaire:', error);
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
            <div className="actions">
              <span onClick={() => handleVote(msg.id, 'up')}>👍 {msg.upvotes}</span>
              <span onClick={() => handleVote(msg.id, 'down')}>👎 {msg.downvotes}</span>
              <div className="comment-section">
                <input
                  type="text"
                  value={comments[msg.id] || ''}
                  onChange={(e) => handleCommentChange(msg.id, e.target.value)}
                  placeholder="Ajouter un commentaire..."
                />
                <button onClick={() => handleAddComment(msg.id)}>Commenter</button>
              </div>
            </div>
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
