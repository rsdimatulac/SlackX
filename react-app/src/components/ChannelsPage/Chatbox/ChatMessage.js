import React from 'react';
import "./ChatMessage.css";

const ChatMessage = () => {
    return (
        <div className="message">
            <div className="message__avatar">
                <img src="https://slackx.s3.amazonaws.com/user-1.jpg" alt=""/>
            </div>
            <div className="message__content">
                <h2>User Name<span>Timestamp here</span></h2>
                <p>Message bodyyyyyyyyyyyyyy</p>
            </div>
        </div>
    )
}

export default ChatMessage;
