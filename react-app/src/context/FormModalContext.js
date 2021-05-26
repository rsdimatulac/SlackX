import React, { createContext, useState, useContext } from "react";

const context = createContext();

export const FormModalContext = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showChannel, setShowChannel] = useState(false);

    const handleSignUpModal = () => {
        setShowLogin(false);
        setShowSignUp(!showSignUp);
    };

    const handleLoginModal = () => {
        setShowLogin(!showLogin);
        setShowSignUp(false);
    };
    
    return (
        <context.Provider value={{ showLogin, showSignUp, setShowLogin, setShowSignUp, handleSignUpModal, handleLoginModal }}>
            {props.children}
        </context.Provider>
    )
};

export default function useConsumeContext() {
    return useContext(context);
};