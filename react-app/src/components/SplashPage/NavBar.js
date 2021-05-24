import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useState, useEffect } from "react";
import SlackXLogo from '../../imgs/SlackX-Logo.png';
import "./NavBar.css";
import SearchButton from '../../imgs/searchButton.png';
import { CgChevronDown, CgSearch } from 'react-icons/cg';
import { useHistory } from "react-router-dom";



const NavBar = ({ isLoaded }) => {
  const history = useHistory();
  const [logo, setLogo] = useState(SlackXLogo);

  const toLoginPage = () => {
    history.push(`/login`);
  }

  const toSignUp = () => {
    history.push(`/sign-up`);
  }

  return (
    <nav id = "navbar" className="NavbarContainer">


        <NavLink to="/" exact={true} activeClassName="active">
                <img
                    className="navbar__logo"
                    src={logo}
                    alt="SlackX Logo" />


        </NavLink>

        <h1 className="SlackX"> SlackX</h1>
        <div className="navBar-left">
          <button style={{cursor: 'pointer'}}>Product <CgChevronDown /></button>
          <button>Enterprise</button>
          <button>Resources</button>
          <button>Pricing</button>
        </div>
        <div className="navBar-right">
          {/* <CgSearch /> */}
          <button className="button1" onClick={toLoginPage} exact={true} style={{cursor: 'pointer'}}>
            Login
          </button>

          <button className="button1" onClick={toSignUp} exact={true} style={{cursor: 'pointer'}}>
            Sign Up
          </button>
          <button className="button2" style={{cursor: 'pointer'}}>MEET THE TEAM</button>
          <button className="button3" style={{cursor: 'pointer'}}>TRY FOR FREE</button>

          {/* <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink> */}

          {/* <LogoutButton /> */}
        </div>
    </nav>
  );
}

export default NavBar;
