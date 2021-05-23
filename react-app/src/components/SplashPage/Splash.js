import React, { useEffect } from 'react';
import './Splash.css';
import IntroImg from '../../imgs/whatisslackx.png';
import SplashImg1 from '../../imgs/splashpageimg1.png'
import NavBar from "./NavBar"

function SplashPage({isLoaded}) {

    useEffect(() => {
        const scrollFunction = function () {
            if (window.pageYOffset <= 450) {
                let mainpage = document.querySelector("body");
                mainpage.style.backgroundColor = "#4a154b";
                mainpage.style.backgroundImage = "url('https://a.slack-edge.com/c2bc65/marketing/img/homepage/bold-prospect/hero/hero-large.png')";
            } 
            if (window.pageYOffset > 450) {
                let mainpage = document.querySelector("body");
                mainpage.style.backgroundColor = "#F6EFE8";
                mainpage.style.backgroundImage = 'none';
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
                    <div className="splash_title_1">It brings your whole team together</div>
                    <div className="splash_title_2">There’s a space for every project</div>
                    <div className="splash_title_3"> And you can chat face to face, with just a click </div>
                </div>
                <div className="splash_page_container_right">
                    <img className="splash_page_img_1" src={SplashImg1}/>
                    <img className="splash_page_img_2" src="https://a.slack-edge.com/e7bc8/marketing/img/homepage/bold-prospect/customer-stories/companies-small/molly-moon/molly-moon-ui@2x.png" />
                    <video src="https://a.slack-edge.com/3b4b5/marketing/img/homepage/bold-prospect/video-calling/video-calling.mp4" autoPlay="true" />
                </div>
            </div>
        </div>

    </div>

 )
}



export default SplashPage;
