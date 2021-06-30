import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { format } from "date-fns";
import { RiDeleteBack2Fill as DeleteIcon } from "react-icons/ri";
import { AiFillEdit as EditIcon } from "react-icons/ai";
import { IoMdSend as SendButton } from "react-icons/io";
import { AiOutlineEnter as SaveIcon } from "react-icons/ai";
import { TiCancel as CancelIcon } from "react-icons/ti";
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
        if (chatInput.length > 0) {
            socket.emit("chat", {
                user_id: user?.id,
                body: chatInput,
                channel_id: channelId,
                created_at: new Date().toGMTString(),
                updated_at: new Date().toGMTString() })
        }

        setChatInput("")
    }

    const messageToEdit = (message) => (e) => {
        setEditChatInput(message.body)
        setEditMessage(true)
        setMessageId(e.target.classList[0])
    }

    const updateChatInput = (e) => setChatInput(e.target.value)
    const updateEditChatInput = (e) => setEditChatInput(e.target.value)

    const inputBox = () => {
        return (
            <div className="input__wrap">
                <form method="post" action="" onSubmit={sendChat}>
                    <input
                        className="input__box"
                        placeholder={currentChannel?.channel_type === "dm" ? `Message ${getNames(currentChannel?.users)}` : `Message #${currentChannel?.name}`}
                        value={chatInput}
                        onChange={updateChatInput}
                        required
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

    const handleEdit = (message_id, chatInput) => async (e) => {
        e.preventDefault()
        const updated_at = new Date().toGMTString()
        await dispatch(editMessageThunk(message_id, chatInput, updated_at))
        setEditMessage(false)
        setEditChatInput('')
        await dispatch(getChannels())
    }

    const editInputBox = (message) => {
        return (
            <div className="input__edit__wrap">
                <form method="post" action="" onSubmit={handleEdit(message.id, editChatInput)}>
                    <input
                        className="input__edit__box"
                        value={editChatInput}
                        onChange={updateEditChatInput}
                    />
                </form>
            </div>
        )
    }



    const deleteMessage = async (message_id) => {
        await dispatch(deleteMessageThunk(message_id))
        await dispatch(getChannels())
    }


    const loggedUserMsgOptions = (message) => {
        return (
            <div className="message__options">
                {editMessage && Number(messageId) === Number(message.id) ?
                    <>
                        <div id="save__icon" onClick={handleEdit(message.id, editChatInput)}><SaveIcon />Save</div>
                        <div id="cancel__icon" onClick={() => setEditMessage(false)}><CancelIcon />Cancel</div>
                    </>
                    :
                    <>
                        <div id="edit__icon" className={`${message?.id} edit__icon`} onClick={messageToEdit(message)}><EditIcon />Edit</div>
                        <div id="delete__icon" onClick={() => deleteMessage(message.id)}><DeleteIcon />Delete</div>
                    </>
                }
            </div>)
    }

    const getNames = (dic_of_names) => {
        const namesArray = Object.values(dic_of_names);

        const newNamesArray = namesArray.filter(eachUser => `${user.firstname} ${user.lastname}` !== eachUser.name).map(user => user.name)

        return newNamesArray.length === 1 ? newNamesArray[0] : newNamesArray.join(", ")
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
                                    <h2>
                                        {users[message?.user_id]?.firstname}
                                        <span>{format(new Date(message?.created_at), "MMM dd, hh:mm a")}</span>
                                        {(Number(user.id) === Number(message.user_id)) && loggedUserMsgOptions(message)}
                                    </h2>
                                    {editMessage && Number(messageId) === Number(message.id) 
                                    ? (editInputBox(message)) 
                                    : (<p>{message?.body}
                                        <span className="content__edited-tag">{(message.created_at !== message.updated_at) && " (edited)"}</span>
                                    </p>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat__input">
                    {inputBox()}
                </div>
            </div>
        </div>
    )
}

export default Chatbox;
