import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux";
import { IoMdSend as SendButton } from "react-icons/io";
import { getMessages } from "../../../store/message"
import "./Chatbox.css";
import "./ChatInput.css";
import "./ChatMessage.css";


// outside of your component, initialize the socket variable
let socket;
// useparam

const Chatbox = () => {
    const user = useSelector(state => state.session.user)
    const channels = useSelector(state => state.channels)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    const messageRef = useRef();
    const { channelId } = useParams()
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("");



    // const chatMessages = channels[channelId]?.messages


    useEffect(() => {

        // create websocket
        socket = io();

        // listen for chat events
        socket.on(channelId, (chat) => {
            // when we recieve a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [channelId])

    useEffect(() => {
        const getData = async () => {
            let newMsArr = []
            let chatMessages = null;
            chatMessages = await dispatch(getMessages(channelId))

            for (let key in chatMessages) {
                newMsArr.push(chatMessages[key])
            }
            setMessages(newMsArr)
        }
        getData()


    }, [channels, channelId])

    useEffect(() => {
        if (messageRef.current) {
          messageRef.current.scrollIntoView(
            {
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest'
            })
        }

      },[messages])

    const sendChat = (e) => {
        e.preventDefault()
        // check for user credential
        socket.emit("chat", { user_id: user?.id, body: chatInput, channel_id: channelId, created_at: new Date().toGMTString() })

        setChatInput("")
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
                            <div key={idx} ref={messageRef} className="message">
                                <div className="message__avatar">
                                    <img src={users[message?.user_id]?.avatar} alt="" />
                                </div>
                                <div className="message__content">
                                    <h2>{users[message?.user_id]?.firstname}<span>{message?.created_at}</span></h2>
                                    <p>{message?.body}</p>
                                </div>
                            </div>
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
