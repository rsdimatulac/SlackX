import React ,{ useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { BsPersonSquare as Avatar } from "react-icons/bs";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { MdHelpOutline as HelpIcon } from "react-icons/md";
import { BiTime as TimeIcon } from "react-icons/bi";
import { MdFiberManualRecord as StatusIcon } from "react-icons/md";
import useConsumeContext from "../../context/FormModalContext";
import UserProfile from "./UserProfile";
import SearchModal from "./SearchModal/SearchModal";
import "./Header.css";


const Header = ({ user }) => {
    const { showProfile, handleProfileModal,
        showDropdownMenu, handleDropdownMenu,
        isActive, setIsActive, setShowChannelForm,
        setShowDMForm, setShowProfile,
        setShowDropdownMenu, setShowCreateModal,
        showSearch, handleSearchModal, setShowSearch
    } = useConsumeContext();

    const [channels, setChannels] = useState([]);
    const [channelSearchInput, setChannelSearchInput] = useState("");
    const dispatch = useDispatch();
    const userChannels = useSelector(state => Object.values(state.channels));

    const handleProfileDropdown = () => {
        handleProfileModal();
        handleDropdownMenu();
    }

    const onLogout = async (e) => { // close all the modals
        dispatch(logout());
        handleDropdownMenu();
        setShowChannelForm(false);
        setShowDMForm(false);
        setShowProfile(false);
        setShowDropdownMenu(false);
        setShowCreateModal(false);
        setShowSearch(false);
    };

    const handleChannelSearch = (e) => {
        if (e.target.value === "") {
            setChannels([]);
            setChannelSearchInput("");
        }

        if (e.target.value.length > 0) {

            let filteredResults = userChannels.filter(channel => {
                if (channel.channel_type === "dm") {
                    let usernames = Object.values(channel.users).map(u => u.name.toLowerCase());
                    usernames = usernames.filter(name => name !== `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`);

                    for (let username of usernames) {

                        if (username.includes(e.target.value.toLowerCase())) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return channel['name']?.toLowerCase().includes(e.target.value.toLowerCase())
                }
            });
            setChannelSearchInput(e.target.value);
            setChannels(filteredResults);
        }

    }

    return (
        <div className="header">
            <div className="header__left">
                {/* <TimeIcon id="time__icon"/> */}
            </div>
            {!showSearch &&
                <div className="header__search" onClick={handleSearchModal}>
                    <div id="search__icon">
                        <SearchIcon />
                    </div>
                    <p>Search SlackX</p>
                </div>
            }
            {showSearch &&
                <input className="header__search" placeholder="Search for channels or users" value={channelSearchInput} onChange={handleChannelSearch}/>
            }
            {showSearch && <SearchModal channels={channels} setChannelSearchInput={setChannelSearchInput} setChannels={setChannels}/>}
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
                <div className="dropdown__menu" onMouseLeave={handleDropdownMenu}>
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
                        <div id="menu__status" onClick={() => setIsActive(prevState => !prevState)}>Set yourself as <strong>{isActive ? "away" : "active" }</strong></div>
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
                            <div onClick={handleDropdownMenu}>Meet the team</div>
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
