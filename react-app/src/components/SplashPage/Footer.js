import React from "react";
import { FaGithub } from "react-icons/fa";
// import { FaLinkedinIn } from "react-icons/fa";
// import { MdLanguage as LanguageIcon } from "react-icons/md";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer__container">
            <div>© 2021 SlackX. No rights reserved.</div>
            <div className="footer__links">
                <div className="footer__letters letter__n"><a href="https://github.com/nathanieldcooke">N</a></div>
                <div className="footer__letters letter__e"><a href="https://github.com/earlwoo">E</a></div>
                <div className="footer__letters letter__r"><a href="https://github.com/rsdimatulac">R</a></div>
                <div className="footer__letters letter__v"><a href="https://github.com/QCHEN0407">V</a></div>
                <a href="https://github.com/rsdimatulac/SlackX">
                    <FaGithub id="github" />
                </a>
            </div>
        </div>
    )
}

export default Footer;