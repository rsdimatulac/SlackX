import React from 'react';
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import "./Chatbox.css";

const Chatbox = () => {
    return (
        <div className="chatbox__profile">
            <div className="chatbox">
                <div className="chat__header">
                    <h1>#Channel Name or DM User Name/s</h1>
                </div>
                {/* TODO: Map Messages array here  */}
                <div className="chatbox__content">
                    <div className="chatbox__messages">
                        <ChatMessage />
                        <br/>
                        <ChatMessage />
                        <br />
                        <ChatMessage />
                        <br />
                        <ChatMessage />
                        <br />
                        <ChatMessage />
                        <br />
                        <ChatMessage />
                        <br />
                        <ChatMessage />
                        <br />
                        <ChatMessage />
                        <br />
                        <ChatMessage />
                        <br />
                        <ChatMessage />
                    </div>
                </div>
                <ChatInput />
            </div>
            <div className="profile">
                {/* TODO: Add UserProfile Component here. BONUS feature, popup sidebar. If not, use MODAL. */}
            </div>
        </div>
    )
}

export default Chatbox;
