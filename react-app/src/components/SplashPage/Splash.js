import React, { useEffect } from 'react';
import './Splash.css';
import IntroImg from '../../imgs/whatisslackx.png';
import FeaturesImg from '../../imgs/features.png';
import SlackLogoBlack from '../../imgs/slack_logo_black.png';
import SlackLogoWhite from "../../imgs/slack_logo_white.png";
import NavBar from "./NavBar"

function SplashPage({isLoaded}) {

    useEffect(() => {
        const scrollFunction = function () {
            let mainpage = document.querySelector("body");
            let title1 = document.getElementById("title1");
            let title2 = document.getElementById("title2");
            let title3 = document.getElementById("title3");

            if (window.pageYOffset <= 650) {

                mainpage.style.backgroundColor = "#4a154b";
                mainpage.style.backgroundImage = "url('https://slackx.s3.amazonaws.com/slack_background.png')";
                title1.style.visibility = "hidden";
                title2.style.visibility = "hidden";
                title3.style.visibility = "hidden";

                let navBarContainer = document.getElementById("navbar");
                let slackLogo = document.querySelector(".navbar__logo");
                slackLogo.src = SlackLogoWhite;
                navBarContainer.className = "NavbarContainer";
                let leftNavBarButtons = document.querySelector(".navbar__headers").childNodes;
                leftNavBarButtons.forEach(e => e.style.color = "white");
                let loginSignup = document.querySelectorAll(".button1");
                loginSignup.forEach(e => e.style.color = "white");
            }

            if (window.pageYOffset > 0) { // This is for the NavBar white
                let navBarContainer = document.getElementById("navbar");
                let slackLogo = document.querySelector(".navbar__logo");
                slackLogo.src = SlackLogoBlack;
                navBarContainer.className = "NavbarContainerWhite";
                let leftNavBarButtons = document.querySelector(".navbar__headers").childNodes;
                leftNavBarButtons.forEach(e => e.style.color = "black");
                let loginSignup = document.querySelectorAll(".button1");
                loginSignup.forEach(e => e.style.color = "black");
            }

            // First image
            if (window.pageYOffset > 650 && window.pageYOffset <= 1450) {
                mainpage.style.backgroundColor = "#F4EDE4";
                mainpage.style.backgroundImage = 'none';

                title2.style.visibility = "hidden";
                title3.style.visibility = "hidden";

                title1.style.visibility = "visible";
                title1.className = "fixed_position";
            }

            //
            if (window.pageYOffset > 1450 && window.pageYOffset <= 2400) {

                mainpage.style.backgroundColor = "#0b2440";
                mainpage.style.backgroundImage = 'none';

                title1.style.visibility = "hidden";
                title3.style.visibility = "hidden";

                title2.style.visibility = "visible";
                title2.className = "fixed_position";
                title2.style.color = "white";
            }

            if (window.pageYOffset > 2400 && window.pageYOffset <= 2850) {

                mainpage.style.backgroundColor = "#0b2440";
                mainpage.style.backgroundImage = 'none';

                title1.style.visibility = "hidden";
                title2.style.visibility = "hidden";

                title3.style.visibility = "visible";
                title3.className = "fixed_position";
                title3.style.color = "white";
            }

            if (window.pageYOffset > 3050) {

                mainpage.style.backgroundColor = "#4a154b";
                mainpage.style.backgroundImage = mainpage.style.backgroundImage = "url('https://slackx.s3.amazonaws.com/slack_background.png')";

                title1.style.visibility = "hidden";
                title2.style.visibility = "hidden";
                title3.style.visibility = "hidden";
            }
        };
        window.addEventListener('scroll', scrollFunction);
        return () => window.removeEventListener('scroll', scrollFunction);
    }, []);

 return(
    <div>
        <div className="MainBKG">
            <NavBar />
            <div className="opening_title">SlackX makes <span className="orange">downright pleasant</span><br /> to work together</div>
            <img className="splash_page_top_img" src={IntroImg} alt=""/>
            <div className="splash_page_container">
                <div className="splash_page_container_left">
                    <div id="title1" className="splash_title_1">It brings your whole team together with these features</div>
                    <div id="title2" className="splash_title_2">SlackX is built with these technologies</div>
                    <div id="title3" className="splash_title_3"> Meet the developers of SlackX </div>
                </div>
                <div className="splash_page_container_right">
                    <img className="splash_page_img_1" src={FeaturesImg} alt=""/>
                    <img className="splash_page_img_2" src="https://a.slack-edge.com/e7bc8/marketing/img/homepage/bold-prospect/customer-stories/companies-small/molly-moon/molly-moon-ui@2x.png" alt="" />
                    <img className="splash_page_img_3" src="https://a.slack-edge.com/e7bc8/marketing/img/homepage/bold-prospect/customer-stories/companies-small/molly-moon/molly-moon-ui@2x.png" alt=""/>
                </div>
            </div>
        </div>

    </div>

 )
}


export default SplashPage;
