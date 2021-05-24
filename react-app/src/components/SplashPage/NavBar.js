import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useState, useEffect } from "react";
import SlackXLogo from '../../imgs/SlackX-Logo.png';
import "./NavBar.css";
import SearchButton from '../../imgs/searchButton.png';
import { CgChevronDown, CgSearch } from 'react-icons/cg';



const NavBar = ({ isLoaded }) => {
  const [logo, setLogo] = useState(SlackXLogo);

  return (
    <nav className="NavbarContainer">


        <NavLink to="/" exact={true} activeClassName="active">
                <img
                    className="navbar__logo"
                    src={logo}
                    alt="SlackX Logo" />


        </NavLink>

        <h1 className="SlackX"> SlackX</h1>
        <div className="navBar-left">
          <button>Product <CgChevronDown /></button>
          <button>Enterprise</button>
          <button>Resources</button>
          <button>Pricing</button>
        </div>
        <div className="navBar-right">
          {/* <CgSearch /> */}
          <button className="button1" to="/login" exact={true} >
            Login
          </button>

          <button className="button1" to="/sign-up" exact={true}>
            Sign Up
          </button>
          <button className="button2">MEET THE TEAM</button>
          <button className="button3">TRY FOR FREE</button>

          {/* <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink> */}

          {/* <LogoutButton /> */}
        </div>
    </nav>
  );
}

export default NavBar;
