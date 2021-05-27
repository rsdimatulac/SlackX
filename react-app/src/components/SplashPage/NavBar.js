import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { FiChevronDown as DownIcon, FiChevronUp as UpIcon } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import LoginFormModal from "../Auth/LoginFormModal";
import SignUpFormModal from "../Auth/SignUpFormModal";
import useConsumeContext from "../../context/FormModalContext.js";
import SlackLogoWhite from "../../imgs/slack_logo_white.png";
import "./NavBar.css";


const NavBar = ({ isLoaded }) => {
  const history = useHistory();
  const { handleLoginModal, showLogin, handleSignUpModal, showSignUp } = useConsumeContext();
  const dispatch = useDispatch();
  const [showFeatures, setShowFeatures] = useState(false)

  const loginDemoUser = async (e) => {
    e.preventDefault();
    await dispatch(login("demouser@slackx.com", "password"));
    history.push("/users/1/1");
  }

  const scrollToFeatures = () => {
    window.scrollTo(0, 1192);
  }

  const scrollToTech = () => {
    window.scrollTo(0, 2347)
  }

  const scrollToTeam = () => {
    window.scrollTo(0, 3473)
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
          <button id="features__header" className="header__name"
            onMouseEnter={() => setShowFeatures(prevState => !prevState)}
            style={{ cursor: 'pointer' }}>
            Features <span className="icon__span">{showFeatures ? <UpIcon id="up__icon" /> : <DownIcon id="down__icon" />}</span></button>
          <button className="header__name" onClick={scrollToTech}>Technologies</button>
          <button className="header__name" onClick={scrollToTeam}> Team</button>
        </div>

      </div>
      {showFeatures && <div onMouseLeave={() => setShowFeatures(prevState => !prevState)} className="features__dropdown" >
        <div>Create account | Login </div>
        <div>Live Chat </div>
        <div>Create | Join Channels</div>
        <div>Send Direct Messages</div>
        <div>Group Messages </div>
        <div className="seemore__link" onClick={scrollToFeatures}>
          See More...
        </div>
      </div>}
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
