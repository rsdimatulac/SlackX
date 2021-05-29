import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { BsPersonSquare as Avatar } from "react-icons/bs";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { MdHelpOutline as HelpIcon } from "react-icons/md";
import { BiTime as TimeIcon } from "react-icons/bi";
import { MdFiberManualRecord as StatusIcon } from "react-icons/md";
import useConsumeContext from "../../context/FormModalContext";
import UserProfile from "./UserProfile";
import "./Header.css";

const Header = ({ user }) => {
    const { showProfile, handleProfileModal, showDropdownMenu, handleDropdownMenu } = useConsumeContext();  
    const [isActive, setIsActive] = useState(true);
    const dispatch = useDispatch();

    const handleProfileDropdown = () => {
        handleProfileModal()
        handleDropdownMenu()
    }
    
    const onLogout = async (e) => {
        dispatch(logout());
        handleDropdownMenu()
    };

    return (
        <div className="header">
            <div className="header__left">
                {/* <TimeIcon id="time__icon"/> */}
            </div>
            <div className="header__search">
                {/* <div id="search__icon">
                    <SearchIcon />
                </div>
                <p>Search SlackX</p> */}
            </div>

            <div className="header__right">
                <div id="help__icon">
                    {/* <HelpIcon /> */}
                </div>
                <div className="header__avatar" onClick={handleDropdownMenu}>
                    {user ? <img className="avatar__image" src={user?.avatar} alt=""/> : <Avatar id="avatar__icon"/>}
                </div>
                <div className="avatar__status">
                    <StatusIcon className={isActive ? "status__icon" : "status__icon away"} />
                </div>
                {showDropdownMenu && 
                <div className="dropdown__menu">
                    <div className="menu__header">
                        <div className="menu__avatar">
                            <img className="menu__image" src={user?.avatar} alt=""></img>
                        </div>
                        <div className="menu__name">
                            <h2>{user?.firstname}</h2>
                            <h3>
                                <StatusIcon className={isActive ? "status__icon" : "status__icon away"} />
                                <p>{isActive ? "Active" : "Away"}</p>
                            </h3>
                        </div>
                    </div>
                    <br />
                    <div className="menu__options">
                        <div id="menu__status" onClick={() => setIsActive(prevState => !prevState)}>Set yourself as <strong>{isActive ? "active" : "away"}</strong></div>
                        <hr />
                        {/* <div>Edit profile</div> */}
                        <div onClick={handleProfileDropdown}>View profile</div>
                        <hr />
                        <div>
                            <a href="https://github.com/rsdimatulac/SlackX" style={{ textDecoration: "none", color: "inherit" }}>
                                GitHub
                            </a>
                        </div>
                        <NavLink to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                            <div>Meet the team</div>
                        </NavLink>
                        <hr />
                        <div onClick={onLogout}>Sign out of SlackX</div>
                    </div>
                </div>}
                {showProfile && <UserProfile user={user}/>}
            </div>
        </div>
    )
}

export default Header;
