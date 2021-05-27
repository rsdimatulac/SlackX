import React, { useEffect } from 'react';
import "./About.css";

const About = () => {

    useEffect(() => {
        if (window.location.pathname === "/about") {
            const meatTeam = document.querySelector(".button2");
            const navbarHeaders = document.querySelectorAll(".header__name");
            const headerName = document.getElementById("features__header");
            meatTeam.style.display = "none";
            navbarHeaders.forEach(header => {
                header.style.display = "none";
            })
            // headerName.innerText = "Meet the Team";
            // headerName.style.fontSize = "26px";
        };
    }, [])

    return (
        <div className="about">
            {/* <h1>Meet the developers</h1> */}
        
        </div>

    )
}

export default About;
