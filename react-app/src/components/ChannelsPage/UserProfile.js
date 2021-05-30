import React from 'react';
import { format } from "date-fns";
import { MdFiberManualRecord as StatusIcon } from "react-icons/md";
import { Modal } from "../../context/Modal";
import useConsumeContext from "../../context/FormModalContext";
import "./UserProfile.css";

const UserProfile = ({ user }) => {
    const { handleProfileModal, isActive, setIsActive } = useConsumeContext();

    return (
        <>
        <Modal onClose={handleProfileModal}>
            <div className="profile">
                <h1>Profile</h1>
                <div className="profile__avatar">
                    <img src={user?.avatar} alt=""/>
                </div>
                <div className="profile__name">
                    <h3>{user?.firstname} {user?.lastname}<span className="status__icon__wrap"><StatusIcon className={isActive ? "status__icon" : "status__icon away"} /></span></h3>
                    <p>{user?.bio}</p>
                </div>
                <hr/>
                <div className="profile__about">
                    <div onClick={() => setIsActive(prevState => !prevState)}>Set yourself as <strong>{isActive ? "active" : "away"}</strong></div>
                    <h4>Display name</h4>
                    <p>{user?.firstname}</p>
                    <h4>Joined since</h4>
                        <p>{format(new Date(user?.created_at), "MMMM yyyy")}</p>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default UserProfile;
