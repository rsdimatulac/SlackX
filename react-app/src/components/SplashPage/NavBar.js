import React, { useState, useEffect }  from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import { CgChevronDown, CgSearch } from 'react-icons/cg';
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import LoginFormModal from "../Auth/LoginFormModal";
import SignUpFormModal from "../Auth/SignUpFormModal";
import useConsumeContext from "../../context/FormModalContext.js";
import SlackXLogo from '../../imgs/SlackX-Logo.png';
import SearchButton from '../../imgs/searchButton.png';
import "./NavBar.css";


const NavBar = ({ isLoaded }) => {
  const history = useHistory();
  const { handleLoginModal, showLogin, handleSignUpModal, showSignUp } = useConsumeContext();
  const [logo, setLogo] = useState(SlackXLogo);
  const dispatch = useDispatch();

  const loginDemoUser = async (e) => {
    e.preventDefault();
    // TODO: UPDATE THE DEMO CREDENTIALS
    await dispatch(login("demouser@slackx.com", "password"));
    history.push("/users/1");
  }


  return (
    <nav id="navbar">
      <div className="navbar__left">
        <NavLink to="/" activeClassName="active">
          <img
            className="navbar__logo"
            src={logo}
            alt="SlackX Logo" />
        </NavLink>
        <div className="navbar__headers">
          <button style={{ cursor: 'pointer' }}>Features <CgChevronDown /></button>
          <button>Technologies</button>
          <button>Team</button>
          {/* <button>Pricing</button> */}
        </div>
      </div>
      <div className="navbar__right">
        {/* <CgSearch /> */}
        <button className="button1" onClick={handleLoginModal} style={{ cursor: 'pointer' }}>Login</button>
        {showLogin && <LoginFormModal />}
        <button className="button1" onClick={handleSignUpModal} style={{ cursor: 'pointer' }}>Sign Up</button>
        {showSignUp && <SignUpFormModal />}
        <button className="button2" style={{ cursor: 'pointer' }}>MEET THE TEAM</button>
        <button onClick={loginDemoUser} className="button3" style={{ cursor: 'pointer' }}>TRY FOR FREE</button>
      </div>
    </nav>
  );
}

export default NavBar;
