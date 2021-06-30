import React, { useEffect } from 'react';
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BiWorld as Website } from "react-icons/bi";
import SlackLogoBlack from '../../imgs/slack_logo_black.png';
import SlackLogoWhite from "../../imgs/slack_logo_white.png";
import "./About.css";

const About = ({user}) => {

    useEffect(() => {
        if (window.location.pathname === "/about") { // This hides the meet the team button
            const meetTeam = document.querySelector(".button2");
            const navbarHeaders = document.querySelectorAll(".header__name");
            meetTeam.style.display = "none";
            navbarHeaders.forEach(header => {
                header.style.display = "none";
            })
        };

        const scrollFunction = function () {
            let navBarContainer = document.getElementById("navbar");
            let loginSignup = document.querySelectorAll(".button1");
            let slackLogo = document.querySelector(".navbar__logo");
            
            if (window.pageYOffset !== 0) { // This is for the NavBar white
                slackLogo.src = SlackLogoBlack;
                navBarContainer.className = "NavbarContainerWhite";
                loginSignup.forEach(e => e.style.color = "black");
            } else {
                navBarContainer.className = "";
                loginSignup.forEach(e => e.style.color = "white");
                slackLogo.src = SlackLogoWhite;
            }
        }
        window.addEventListener('scroll', scrollFunction);
        return () => window.removeEventListener('scroll', scrollFunction);
    }, [])

    return (
        <div className="about">
            <div className="upper__section">
                <h1>Hello</h1>
                <p className="intro">We're a group of problem-solvers, creators, <br /> coders, storytellers, and developers at App Academy. <br />We use modern design and innovative technologies <br />to empower humans and simplify life.</p>
            </div>
            <div className="down__section">
                <div className="middle__text">
                    <h2>Meet our amazing team.</h2>
                    <p>We're a talented group of creative individuals interested in software development, <br />games, hospitality, aviation, journalism, and all niches in between.</p>
                </div>
                <div className="badges">
                    <div className="test_card">
                        <img src="https://slackx.s3.amazonaws.com/nathaniel.jpg" alt=""></img>
                        <h1>Nathaniel Cooke</h1>
                        <h4>Software Engineer</h4>
                        <div className="socialmedia">
                            <a href="https://github.com/nathanieldcooke">
                                <FaGithub size={30} id="github" />
                            </a>
                            <a href="https://www.linkedin.com/in/nathaniel-cooke-NRD">
                                <FaLinkedinIn color='#0072b1' size={30} id="linkedinIn" />
                            </a>
                            <a className="website" href="https://nathanieldcooke.github.io/">
                                <Website id="website_n"/>
                            </a>
                        </div>
                        <p>Based in Las Vegas, Nevada. I have strong full-stack web development experience. Having built few websites and games, I continue to grow as a developer everyday. While on this journey, I hope we can build some awesome applications together!</p>
                    </div>
                    <div className="test_card">
                        <img src="https://slackx.s3.amazonaws.com/earl.jpg" alt=""></img>
                        <h1>Earl Woo</h1>
                        <h4>Software Engineer</h4>
                        <div className="socialmedia">
                            <a href="https://github.com/earlwoo">
                                <FaGithub size={30} id="github" />
                            </a>
                            <a href="https://www.linkedin.com/in/earl-woo-12737a208/">
                                <FaLinkedinIn color='#0072b1' size={30} id="linkedinIn" />
                            </a>
                            <a className="website" href="https://earlwoo.github.io/">
                                <Website id="website_e" />
                            </a>
                        </div>
                        <p>Thank you for visiting our site SlackX. I am currently a developer based in Philadelphia, PA. After thirteen years in the hospitality industry, I decided to pursue another career as a full-stack developer in order to make positive and useful contributions through my work.</p>
                    </div>
                    <div className="test_card">
                        <img src="https://slackx.s3.amazonaws.com/renerose.jpg" alt=""></img>
                        <h1>Renerose Dimatulac</h1>
                        <h4>Software Engineer</h4>
                        <div className="socialmedia">
                            <a href="https://github.com/rsdimatulac">
                                <FaGithub size={30} id="github" />
                            </a>
                            <a href="https://www.linkedin.com/in/renerosedimatulac/">
                                <FaLinkedinIn color='#0072b1' size={30} id="linkedinIn" />
                            </a>
                            <a href="https://rsdimatulac.github.io/">
                                <Website id="website_r"/>
                            </a>
                        </div>
                        <p>I’m a Software Engineer with a bachelor's degree in Electronics Engineering. I am many things in this lifetime— a licensed pilot, a licensed engineer, but most prevalent and importantly, is a student. My goal is to use the knowledge I have, and continuously hone my skills to find innovative solutions in solving real world problems.</p>
                    </div>
                    <div className="test_card">
                        <img src="https://slackx.s3.amazonaws.com/vivian.png" alt=""></img>
                        <h1>Vivian Chen</h1>
                        <h4 className="se">Software Engineer</h4>
                        <div className="socialmedia">
                            <a href="https://github.com/QCHEN0407">
                                <FaGithub size={30} id="github" />
                            </a>
                            <a href="https://www.linkedin.com/in/qingwei-vivian-c-265093215/">
                                <FaLinkedinIn color='#0072b1' size={30} id="linkedinIn" />
                            </a>
                            <a href="https://qchen0407.github.io/">
                                <Website id="website_v" />
                            </a>
                        </div>
                        <p>As a software engineer, I am driven by my curiosity and my desire to create. Before my career in web development, I was a multimedia journalist based in Wall Street. I believe new technologies are bringing revolution to media platforms and that’s why I am here.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
