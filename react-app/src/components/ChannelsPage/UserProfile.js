import React from 'react';
import { Modal } from "../../context/Modal";
import { format } from "date-fns";
import useConsumeContext from "../../context/FormModalContext";
import "./UserProfile.css";

const UserProfile = ({ user }) => {
    const { handleProfileModal } = useConsumeContext();
    return (
        <>
        <Modal onClose={handleProfileModal}>
            <h1>Profile</h1>
            <div className="profile">
                <div className="profile__avatar">
                    <img src={user?.avatar} alt=""/>
                </div>
                <div className="profile__name">
                    <h3>{user?.firstname} {user?.lastname}</h3>
                    <p>{user?.bio}</p>
                </div>
                <hr/>
                <div className="profile__about">
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
