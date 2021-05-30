import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import useConsumeContext from "../../../context/FormModalContext";
import { Modal } from "../../../context/Modal";



const SearchModal = () => {
    const { handleSearchModal } = useConsumeContext();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const history = useHistory();

    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     history.push(`/users/${userId}/${channelId}`)

    // }


    return (
        <>
            <Modal onClose={handleSearchModal}>
                <div className="search__modal">




                </div>
            </Modal>
        </>
    )

}
