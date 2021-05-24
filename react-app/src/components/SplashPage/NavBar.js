import React, { useState, useEffect }  from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import { CgChevronDown, CgSearch } from 'react-icons/cg';
import { useHistory } from "react-router-dom";
// import LogoutButton from '../Auth/LogoutButton';
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
    await dispatch(login("demo@aa.io", "password"))
    // return <Redirect to={`/users/1`} />
    history.push("/users/1")
  }


  return (
    <nav id="navbar" className="NavbarContainer">
      <NavLink to="/" activeClassName="active">
        <img
          className="navbar__logo"
          src={logo}
          alt="SlackX Logo" />
      </NavLink>

      <h1 className="SlackX"> SlackX</h1>
      <div className="navBar-left">
        <button style={{ cursor: 'pointer' }}>Product <CgChevronDown /></button>
        <button>Enterprise</button>
        <button>Resources</button>
        <button>Pricing</button>
      </div>
      <div className="navBar-right">
        {/* <CgSearch /> */}
        <button className="button1" onClick={handleLoginModal} style={{ cursor: 'pointer' }}>Login</button>
        {showLogin && <LoginFormModal />}
        <button className="button1" onClick={handleSignUpModal} style={{ cursor: 'pointer' }}>Sign Up</button>
        {showSignUp && <SignUpFormModal />}
        <button className="button2" style={{ cursor: 'pointer' }}>MEET THE TEAM</button>
        <form onSubmit={loginDemoUser}>
        <button className="button3" type="submit" style={{ cursor: 'pointer' }}>TRY FOR FREE</button>
        </form>
        {/* <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink> */}

        {/* <LogoutButton /> */}
      </div>
    </nav>
  );
}

export default NavBar;
