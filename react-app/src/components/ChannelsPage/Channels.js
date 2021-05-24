import React from 'react';
// import User from "../User";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";
import Chatbox from "./Chatbox/Chatbox";
import "./Channels.css";

const Channels = ({ user }) => {

    return (
        <div className="channels">
           <Header user={user}/>
           <div className="channels__main">
                <Sidebar user={user} />
                <Chatbox />
           </div>
           {/* <User /> */}
        </div>
    )
}

export default Channels;
