import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useState, useEffect } from "react";
import SlackXLogo from '../../imgs/SlackX-Logo.png';
import "./NavBar.css";



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

        <h1 className="SlackX"> slackX</h1>

          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>

          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>

          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>

          <LogoutButton />

    </nav>
  );
}

export default NavBar;
