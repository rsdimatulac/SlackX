import React, { createContext, useState, useContext } from "react";

const context = createContext();

export const FormModalContext = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showChannelForm, setShowChannelForm] = useState(false);
    const [showDMForm, setShowDMForm] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);

    const handleDropdownMenu = () => {
        setShowDropdownMenu(prevState => !prevState);
    };

    const handleProfileModal = () => {
        setShowProfile(prevState => !prevState);
    }

    const handleChannelFormModal = () =>{
        setShowChannelForm((prevState) => !prevState);
    }

    const handleDMFormModal = () =>{
        setShowDMForm((prevState) => !prevState);
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
            showChannelForm, setShowChannelForm,
            showDMForm, setShowDMForm,
            handleChannelFormModal, handleDMFormModal, 
            handleProfileModal, showProfile,
            handleDropdownMenu, showDropdownMenu
        }}>
            {props.children}
        </context.Provider>
    )
};

export default function useConsumeContext() {
    return useContext(context);
};
