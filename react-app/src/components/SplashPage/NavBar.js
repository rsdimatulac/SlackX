import React, { useState, useEffect }  from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import { CgSearch } from 'react-icons/cg';
import { FiChevronDown as DownIcon, FiChevronUp as UpIcon } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import LoginFormModal from "../Auth/LoginFormModal";
import SignUpFormModal from "../Auth/SignUpFormModal";
import useConsumeContext from "../../context/FormModalContext.js";
import SlackLogoWhite from "../../imgs/slack_logo_white.png";
import SearchButton from '../../imgs/searchButton.png';
import "./NavBar.css";


const NavBar = ({ isLoaded }) => {
  const history = useHistory();
  const { handleLoginModal, showLogin, handleSignUpModal, showSignUp } = useConsumeContext();
  const dispatch = useDispatch();

  const loginDemoUser = async (e) => {
    e.preventDefault();
    await dispatch(login("demouser@slackx.com", "password"));
    history.push("/users/1");
  }


  return (
    <nav id="navbar">
      <div className="navbar__left">
        <NavLink to="/" activeClassName="active">
          <img
            className="navbar__logo"
            src={SlackLogoWhite}
            alt="SlackX Logo" />
        </NavLink>
        <div className="navbar__headers">
          <button className="header__name" style={{ cursor: 'pointer' }}>Features <span className="icon__span"><DownIcon id="down__icon" /></span></button>
          <button className="header__name">Technologies</button>
          <button className="header__name"> Team</button>
        </div>
      </div>
      <div className="navbar__right">
        <button className="button1" onClick={handleLoginModal} style={{ cursor: 'pointer' }}>Login</button>
        {showLogin && <LoginFormModal />}
        <button className="button1" onClick={handleSignUpModal} style={{ cursor: 'pointer' }}>Sign Up</button>
        {showSignUp && <SignUpFormModal />}
        <NavLink to="/about" style={{ color: "inherit" }}>
          <button className="button2" style={{ cursor: 'pointer' }}>MEET THE TEAM</button>
        </NavLink>
        <button onClick={loginDemoUser} className="button3" style={{ cursor: 'pointer' }}>TRY FOR FREE</button>
      </div>
    </nav>
  );
}

export default NavBar;
