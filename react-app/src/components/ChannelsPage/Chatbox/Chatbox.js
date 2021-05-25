import React, { useEffect, useState } from 'react';
// import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import "./Chatbox.css";
import { io } from 'socket.io-client';
import { useSelector } from "react-redux"
import { IoMdSend as SendButton } from "react-icons/io";
import "./ChatInput.css";


// outside of your component, initialize the socket variable
let socket;

const Chatbox = () => {
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("");
    const user = useSelector(state => state.session.user)

    useEffect(() => {

        // create websocket
        socket = io();

        // listen for chat events
        socket.on("potato", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const sendChat = (e) => {
        e.preventDefault()
        // check for user credential
        socket.emit("potato", { user: user?.firstname, body: chatInput });
        setChatInput("")
        // console.log("________chatInpt!!", chatInput)
        // thunk: update database with message (fetch to post create message)
    }

    const updateChatInput = (e) => setChatInput(e.target.value)

    return (
        <div className="chatbox__profile">
            <div className="chatbox">
                <div className="chat__header">
                    <h1>#Channel Name or DM User Name/s</h1>
                </div>
                {/* TODO: Map Messages array here  */}
                <div className="chatbox__content">
                   <div className="chatbox__messages">
                   {messages.map((message, idx) => (
                     <ChatMessage props={message, idx, user} />
                ))}
                    </div>
                </div>
                <div className="chat__input">
                    <div className="input__wrap">
                        <form method="post" action="" onSubmit={sendChat}>
                            <input
                                className="input__box"
                                placeholder={"Message #channel-name or user firstname"}
                                // placeholder={`Message #${channelName}`}
                                value={chatInput}
                                onChange={updateChatInput}
                            />
                            {chatInput ?
                                <button className="send__button enabled" type="submit"><SendButton /></button>
                                :
                                <button className="send__button" disabled={true}><SendButton /></button>
                            }
                        </form>
                    </div>
                </div>
            </div>
            <div className="profile">
                {/* TODO: Add UserProfile Component here. BONUS feature, popup sidebar. If not, use MODAL. */}
            </div>
        </div>
    )
}

export default Chatbox;
