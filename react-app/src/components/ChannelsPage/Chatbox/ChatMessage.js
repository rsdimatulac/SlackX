// import React from 'react';
// import { useSelector } from "react-redux"
// import "./ChatMessage.css";

// const ChatMessage = ({ message, idx }) => {
//     const user = useSelector(state => state.session.user)
//     const channels = useSelector(state => state.channels)

//     if (message) {
//         console.log("message", message)
//     }
//     return (
//         <div key={idx} className="message">
//             <div className="message__avatar">
//                 <img src={user?.avatar} alt=""/>
//             </div>
//             <div className="message__content">
//                 <h2>{user?.firstname}<span>Timestamp here</span></h2>
//                 <p>{message?.body}</p>
//             </div>
//         </div>
//     )
// }

// export default ChatMessage;
