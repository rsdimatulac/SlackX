import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { BsPersonSquare as Avatar } from "react-icons/bs";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { MdHelpOutline as HelpIcon } from "react-icons/md";
import { BiTime as TimeIcon } from "react-icons/bi";
import { MdFiberManualRecord as StatusIcon } from "react-icons/md";
import "./Header.css";

const Header = ({ user }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const dispatch = useDispatch();
    
    const onLogout = async (e) => {
        dispatch(logout());
    };

    return (
        <div className="header">
            <div className="header__left">
                <TimeIcon id="time__icon"/>
            </div>
            {/* TODO: ADD onClick here to open Search Modal */}
            <div className="header__search">
                <div id="search__icon">
                    <SearchIcon />
                </div>
                <p>Search SlackX</p>
            </div>

            <div className="header__right">
                <div id="help__icon">
                    <HelpIcon />
                </div>
                <div className="header__avatar" onClick={() => setShowDropdown(prevState => !prevState)}>
                    {user ? <img className="avatar__image" src={user?.avatar} alt=""/> : <Avatar id="avatar__icon"/>}
                </div>
                <div className="avatar__status">
                    <StatusIcon className={isActive ? "status__icon" : "status__icon away"} />
                </div>
                {showDropdown && 
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
                        <div>Edit profile</div>
                        {/* TODO: Add the Channel ID */}
                        <NavLink to={`/users/${user?.id}/:channelId/profile`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div>View profile</div>
                        </NavLink>
                        <hr />
                        <div>
                            <a href="https://github.com/rsdimatulac/SlackX" style={{ textDecoration: "none", color: "inherit" }}>
                                GitHub
                            </a>
                        </div>
                        <NavLink to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                            <div>About us</div>
                        </NavLink>
                        <hr />
                        <div onClick={onLogout}>Sign out of SlackX</div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Header;