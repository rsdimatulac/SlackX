import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../store/users';
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";
import Chatbox from "./Chatbox/Chatbox";
import useConsumeContext from "../../context/FormModalContext";
import "./Channels.css";


const Channels = ({ user }) => {
    const { setShowLogin, setShowSignUp } = useConsumeContext();
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchData() {
           await dispatch(getUsers())
        }
        fetchData()
    }, [dispatch])

    if (window.location.pathname.includes("/users"))  {
        window.document.body.style.overflow = "hidden";
    };    

    useEffect(() => {
        setShowSignUp(false);
        setShowLogin(false);
    }, [setShowLogin, setShowSignUp]);

    return (
        <div className="channels">
           <Header user={user}/>
           <div className="channels__main">
                <Sidebar user={user} />
                <Chatbox />
           </div>
        </div>
    )
}

export default Channels;
