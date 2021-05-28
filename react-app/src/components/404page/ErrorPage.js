import React, { useEffect } from 'react';
import SlackLogoBlack from '../../imgs/slack_logo_black.png';
import SlackLogoWhite from "../../imgs/slack_logo_white.png";
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
                <h1>WOOF! </h1>
                <h2>YOU FOUND KIMI!</h2>
                <p>Unfortunately you have also found an elusive 404 page. <br/>You can go back, or stay with me and <br/>have a wonderful day! </p>
            </div>
            <div className="error_img">
                <img id="kimi" src={kimi404}></img>
            </div>
        </div>
    )
}

export default ErrorPage;
