import React, { createContext, useState, useContext } from "react";

const context = createContext();

export const FormModalContext = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showChannelForm, setShowChannelForm] = useState(false);
    const [showDMForm, setShowDMForm] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const handleCreateModal = () => {
        setShowCreateModal(prevState => !prevState);
        setShowSearch(false);
    };

    const handleDropdownMenu = () => {
        setShowDropdownMenu(prevState => !prevState);
        setShowSearch(false);
    };

    const handleProfileModal = () => {
        setShowProfile(prevState => !prevState);
        setShowSearch(false);
    }

    const handleChannelFormModal = () =>{
        setShowChannelForm((prevState) => !prevState);
        setShowSearch(false);
    }

    const handleDMFormModal = () =>{
        setShowDMForm((prevState) => !prevState);
        setShowSearch(false);
    }

    const handleSignUpModal = () => {
        setShowLogin(false);
        setShowSignUp(!showSignUp);
    };

    const handleLoginModal = () => {
        setShowLogin(!showLogin);
        setShowSignUp(false);
    };

    const handleSearchModal = () => {
        setShowSearch((prevState) => !prevState);
        setShowCreateModal(false);
        setShowDMForm(false);
        setShowChannelForm(false);
        setShowProfile(false);
    };

    return (
        <context.Provider value={{
            showLogin, showSignUp,
            setShowLogin, setShowSignUp,
            handleSignUpModal, handleLoginModal,
            showChannelForm, setShowChannelForm,
            showDMForm, setShowDMForm,
            handleChannelFormModal, handleDMFormModal,
            handleProfileModal, showProfile, setShowProfile,
            handleDropdownMenu, showDropdownMenu, setShowDropdownMenu,
            isActive, setIsActive,
            handleCreateModal, showCreateModal, setShowCreateModal,
            handleSearchModal, showSearch, setShowSearch,
        }}>
            {props.children}
        </context.Provider>
    )
};

export default function useConsumeContext() {
    return useContext(context);
};
