import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useConsumeContext from "../../../context/FormModalContext";
import { GrClose as Close } from "react-icons/gr";
import "./SearchModal.css";


const SearchModal = ({ channels, setChannelSearchInput, setChannels }) => {
    const { handleSearchModal } = useConsumeContext();
    const { userId } = useParams();
    const history = useHistory();

    const handleRedirect = (channel_id) => {
        handleSearchModal();
        history.push(`/users/${userId}/${channel_id}`)
    }

    const parseChannelName = (channel) => {
        if (channel.channel_type === "dm") {
            return Object.values(channel.users).map(user => user.name).join(", ");
        } else {
            return channel.name;
        }
    }

    const handleSearchCloseModal = () => {
        setChannelSearchInput("");
        setChannels([]);
        handleSearchModal();
    }

    return (

        <div className="search__area">
            <h1>{"Search for channels or users"}</h1>
            <Close onClick={handleSearchCloseModal} id="search__area__close" />
            <div className="search__area__results">
                <ul>
                    {   channels?.length === 0 ? "No results" :
                        channels?.map(channel => <li className="results__list" key={channel.id} onClick={() => handleRedirect(channel.id)}>#{parseChannelName(channel)} </li>)
                    }
                </ul>
            </div>
        </div>

    )

}

export default SearchModal;
