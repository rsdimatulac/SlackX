import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { format } from "date-fns";
import { IoMdSend as SendButton } from "react-icons/io";
import { deleteMessageThunk, editMessageThunk, getMessages } from "../../../store/message"
import { getChannels } from "../../../store/channel"
import "./Chatbox.css";
import "./ChatInput.css";
import "./ChatMessage.css";


// outside of your component, initialize the socket variable
let socket;


const Chatbox = () => {
    const user = useSelector(state => state.session.user)
    const channels = useSelector(state => state.channels)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    const messageRef = useRef();
    const { channelId } = useParams()
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("");
    const currentChannel = channels[channelId];
    const [editChatInput, setEditChatInput] = useState('')
    const [editMessage, setEditMessage] = useState(false);
    const [messageId, setMessageId] = useState(null);


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
    }, [channels, channelId, dispatch])


    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView(
                {
                    behavior: 'auto',
                    block: 'end',
                    inline: 'nearest'
                })
        }
    }, [messages])


    const sendChat = (e) => {
        e.preventDefault()
        // check for user credential
        socket.emit("chat", { user_id: user?.id, body: chatInput, channel_id: channelId, created_at: new Date().toGMTString() })

        setChatInput("")
    }

    const messageToEdit = (e) => {
        setEditMessage(true)
        setMessageId(e.target.parentNode.parentNode.id)
    }

    const inputBox = () => {
        return (
            <div className="input__wrap">
                <form method="post" action="" onSubmit={sendChat}>
                    <input
                        className="input__box"
                        placeholder={currentChannel?.channel_type === "dm" ? `Message${getNames(currentChannel?.users)}` : `Message #${currentChannel?.name}`}
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
        )

    }

    const editInputBox = (body, i) => {
        // i++
        // if (i === 2) {
        // setChatInput(body)
        // }
        // console.log(body)
        return (
            <div className="input__wrap">
                <form method="post" action="" onSubmit={sendChat}>
                    <input
                        className="input__box"
                        // placeholder={body}
                        // placeholder={`Message #${channelName}`}
                        value={editChatInput}
                        onChange={updateEditChatInput}
                    />
                    {/* {chatInput ?
                        <button className="send__button enabled" type="submit"><SendButton /></button>
                        :
                        <button className="send__button" disabled={true}><SendButton /></button>
                    } */}
                </form>
            </div>
        )

    }

    const handleEdit = async (message_id, chatInput) => {
        await dispatch(editMessageThunk(message_id, chatInput))
        setEditMessage(false)
        setEditChatInput('')
        await dispatch(getChannels())
    }

    const deleteMessage = async (message_id) => {
        await dispatch(deleteMessageThunk(message_id))
        await dispatch(getChannels())
    }

    const loggedUserMsgOptions = (message) => {
        return (
            <div>
                {editMessage && messageId === message.id ?
                    <>
                        <button
                            onClick={() => handleEdit(message.id, editChatInput)}
                        >Save</button>
                        <button
                            onClick={() => setEditMessage(false)}
                        >Cancel</button>
                    </>
                    :
                    <>
                        <button
                            onClick={messageToEdit}
                        >Edit
                        </button>
                        <button
                            onClick={() => deleteMessage(message.id)}
                        >Delete
                        </button>
                    </>
                }
            </div>)
    }


    const updateChatInput = (e) => setChatInput(e.target.value)
    const updateEditChatInput = (e) => setEditChatInput(e.target.value)

    const getNames = (dic_of_names) => {
        let names = ''
        for (let name in dic_of_names) {
            names += `, ${dic_of_names[name].name}`
        }
        return names.slice(1, names.length)
    }

    return (
        <div className="chatbox__profile">
            <div className="chatbox">
                <div className="chat__header">
                    <h1>{currentChannel?.channel_type === "dm" ? getNames(currentChannel?.users) : `#${currentChannel?.name}`}</h1>
                </div>
                <div className="chatbox__content">
                    <div className="chatbox__messages">
                        {messages.map((message, idx) => (
                            <div key={idx} ref={messageRef} className="message" id={`${message.id}`}>
                                <div className="message__avatar">
                                    <img src={users[message?.user_id]?.avatar} alt="" />
                                </div>
                                <div className="message__content">
                                    <h2>{users[message?.user_id]?.firstname}<span>{format(new Date(message?.created_at), "MMM dd, hh:mm a")}</span></h2>
                                    {editMessage && messageId === message.id ? (editInputBox(message.body)) : (<p>{message?.body}</p>)}
                                </div>
                                {(user.id === message.user_id) && loggedUserMsgOptions(message)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat__input">
                    {inputBox()}
                </div>
            </div>
            <div className="profile">
                {/* TODO: Add UserProfile Component here. BONUS feature, popup sidebar. If not, use MODAL. */}
            </div>
        </div>
    )
}

export default Chatbox;
