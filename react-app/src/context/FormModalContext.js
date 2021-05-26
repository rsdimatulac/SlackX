import React, { createContext, useState, useContext } from "react";

const context = createContext();

export const FormModalContext = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showChannel, setShowChannel] = useState(false);
    const [showDM, setShowDM] = useState(false);

    const handleChannelModal = () =>{
        setShowChannel((prevState) => !prevState);
    }

    const handleDMModal = () =>{
        setShowDM((prevState) => !prevState);
    }

    const handleSignUpModal = () => {
        setShowLogin(false);
        setShowSignUp(!showSignUp);
    };

    const handleLoginModal = () => {
        setShowLogin(!showLogin);
        setShowSignUp(false);
    };

    return (
        <context.Provider value={{
            showLogin, showSignUp,
            setShowLogin, setShowSignUp,
            handleSignUpModal, handleLoginModal,
            showChannel, setShowChannel,
            showDM, setShowDM,
            handleChannelModal,handleDMModal
            }}>
            {props.children}
        </context.Provider>
    )
};

export default function useConsumeContext() {
    return useContext(context);
};
