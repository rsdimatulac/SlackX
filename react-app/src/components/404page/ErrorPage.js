import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import kimi404 from '../../imgs/Kimi404__2.png';
import "./ErrorPage.css";


const ErrorPage = () =>{

    useEffect(() => {
        const navbarHeaders = document.querySelectorAll(".header__name");
        navbarHeaders.forEach(header => {
            header.style.display = "none";
        })
    }, [])


    return(
        <div className="ErrorPage">
            <div className="error_text">
                <h1>WOOF!</h1>
                <h2>You found Kimi.</h2>
                <p>Unfortunately, you have also found an elusive page that doesn't exist.<br /> You can go back, or stay with me and have a wonderful day! </p>
                <h6>Error code: 404</h6>
                <ul className="links__container">
                    <li>Here are some helpful links instead:</li>
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                        <li className="links__list">Home</li>
                    </NavLink>
                    <NavLink to="/about" style={{ textDecoration: "none" }}>
                        <li className="links__list">Meet the team</li>
                    </NavLink>
                    <li><a href="https://github.com/rsdimatulac/SlackX" className="links__list">GitHub</a></li>
                </ul>
            </div>
            <div className="error_img">
                <img id="kimi" src={kimi404} alt=""/>
            </div>
        </div>
    )
}

export default ErrorPage;
