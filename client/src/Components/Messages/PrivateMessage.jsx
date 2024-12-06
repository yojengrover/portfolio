import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PrivateMessage.css'; // Assuming you have a CSS file for styling

const PrivateMessage = () => {
  const { token } = useParams(); // Retrieve the token from the URL
  const navigate = useNavigate(); // For navigation
  const [message, setMessage] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/message/${token}`);
        setMessage(response.data.content);
      } catch (error) {
        console.error('Error fetching message:', error);
        setIsDeleted(true); // If the message cannot be retrieved, assume it's deleted
      }
    };

    fetchMessage();
  }, [token]);

  const handleBackToSafety = () => {
    navigate('/'); // Redirect to the homepage or another safe route
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Private Note</h1>
      </header>
      <main className="main-content">
        <h1 className="title">Private Message</h1>
        <div className="message-box">
          {isDeleted ? (
            <p className="deleted-warning">
              This message has been deleted after viewing.
            </p>
          ) : (
            <p className="message-content">{message}</p>
          )}
        </div>
        <div className="back-button-wrapper">
          <button className="back-button" onClick={handleBackToSafety}>
            Back to Safety
          </button>
        </div>
      </main>
    </div>
  );
};

export default PrivateMessage;

