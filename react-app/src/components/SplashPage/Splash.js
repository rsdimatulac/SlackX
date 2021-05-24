import React, { useEffect } from 'react';
import './Splash.css';
import IntroImg from '../../imgs/whatisslackx.png';
import SplashImg1 from '../../imgs/splashpageimg1.png'
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
                mainpage.style.backgroundImage = "url('https://a.slack-edge.com/c2bc65/marketing/img/homepage/bold-prospect/hero/hero-large.png')";
                title1.style.visibility = "hidden";
                title2.style.visibility = "hidden";
                title3.style.visibility = "hidden";

                let navBarContainer = document.getElementById("navbar");
                let slackXLogoText = document.querySelector(".SlackX");
                slackXLogoText.style.color = "white";
                navBarContainer.className = "NavbarContainer";
                let leftNavBarButtons = document.querySelector(".navBar-left").childNodes;
                leftNavBarButtons.forEach(e => e.style.color = "white");
                let loginSignup = document.querySelectorAll(".button1");
                loginSignup.forEach(e => e.style.color = "white");
                let button3 =  document.querySelector(".button3");
                button3.style.border = "none";

            }

            if (window.pageYOffset > 650 && window.pageYOffset <= 1450) {

                let navBarContainer = document.getElementById("navbar");
                let slackXLogoText = document.querySelector(".SlackX");
                slackXLogoText.style.color = "black";
                navBarContainer.className = "NavbarContainerWhite";
                let leftNavBarButtons = document.querySelector(".navBar-left").childNodes;
                leftNavBarButtons.forEach(e => e.style.color = "black");
                let loginSignup = document.querySelectorAll(".button1");
                loginSignup.forEach(e => e.style.color = "black");
                let button3 =  document.querySelector(".button3");
                button3.style.border = "solid #4a154b 1px";



                mainpage.style.backgroundColor = "#F6EFE8";
                mainpage.style.backgroundImage = 'none';

                title2.style.visibility = "hidden";
                title3.style.visibility = "hidden";

                title1.style.visibility = "visible";
                title1.className = "fixed_position";

            }

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
                mainpage.style.backgroundImage = mainpage.style.backgroundImage = "url('https://a.slack-edge.com/c2bc65/marketing/img/homepage/bold-prospect/hero/hero-large.png')";

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
            <div className="opening_title">SlackX Makes <span className="orange">downright pleasant</span> to work together</div>
            <img className="splash_page_top_img" src={IntroImg}/>
            <div className="splash_page_container">
                <div className="splash_page_container_left">
                    <div id="title1" className="splash_title_1">It brings your whole team together</div>
                    <div id="title2" className="splash_title_2">There’s a space for every project</div>
                    <div id="title3" className="splash_title_3"> And you can chat face to face, with just a click </div>
                </div>
                <div className="splash_page_container_right">
                    <img className="splash_page_img_1" src={SplashImg1}/>
                    <img className="splash_page_img_2" src="https://a.slack-edge.com/e7bc8/marketing/img/homepage/bold-prospect/customer-stories/companies-small/molly-moon/molly-moon-ui@2x.png" />
                    <video className="splash_page_video1" src="https://a.slack-edge.com/3b4b5/marketing/img/homepage/bold-prospect/video-calling/video-calling.mp4" autoPlay muted loop />
                </div>
            </div>
        </div>

    </div>

 )
}


export default SplashPage;

