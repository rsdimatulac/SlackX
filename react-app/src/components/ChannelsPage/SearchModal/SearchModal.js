import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { FaSearch as SearchIcon } from "react-icons/fa";
import useConsumeContext from "../../../context/FormModalContext";
import { GrClose as Close } from "react-icons/gr";
import "./SearchModal.css";

const SearchModal = ({channels}) => {
    const { handleSearchModal } = useConsumeContext();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const history = useHistory();

    const handleRedirect = (channel_id) => {
        handleSearchModal();
        history.push(`/users/${userId}/${channel_id}`)
    }

    const parseChannelName = (channel) => {
        if (channel.channel_type === "dm") {
            return  Object.values(channel.users).map(user => user.name).join(", ");
        } else {
            return channel.name;
        }
    }

    return (

        <div className="search__area">
           <Close onClick={handleSearchModal} id = "search__area__close"/>
           <ul>
           {
            channels?.map(channel => <li key={channel.id} style={{cursor: 'pointer'}} onClick={() => handleRedirect(channel.id)}># {parseChannelName(channel)} </li>)
           }
           </ul>
        </div>

    )

}

export default SearchModal;
