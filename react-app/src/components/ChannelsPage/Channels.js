import React, { useEffect } from 'react';
// import User from "../User";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";
import Chatbox from "./Chatbox/Chatbox";
import useConsumeContext from "../../context/FormModalContext";
import "./Channels.css";

const Channels = ({ user }) => {
    const { setShowLogin, setShowSignUp } = useConsumeContext();

    if (window.location.pathname.includes("/users"))  {
        window.document.body.style.overflow = "hidden";
    };

    useEffect(() => {
        setShowSignUp(false);
        setShowLogin(false);
    }, []);

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
