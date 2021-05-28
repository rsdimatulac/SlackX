import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createChannel } from "../../../store/channel";
import useConsumeContext from "../../../context/FormModalContext";
import { Modal } from "../../../context/Modal";
import "./ChannelModal.css"


const ChannelModal = () => {
    const { handleChannelFormModal } = useConsumeContext();
    const [channelName, setChannelName] = useState("");
    const [channelType, setChannelType] = useState("public");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();

    const toggleChannelType = (e) => {
        if (e.target.checked) { // true
            setChannelType("private")
        } else { // false, not checked
            setChannelType("public")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(createChannel(channelName, channelType));
        if (data?.errors) {
            setErrors(data.errors);
        } else {
            handleChannelFormModal();
            history.push(`/users/${userId}/${data?.id}`)
        }
    }

    return (
        <>
            <Modal onClose={handleChannelFormModal}>
                <div className="channel__form">
                    <form onSubmit={handleSubmit}>
                        <div className="channel__form__header">
                            <h1>Create a channel</h1>
                            <p>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</p>
                        </div>
                        <div className="errors__channel">
                            {errors?.map((error) => (
                                <div key={error}>・{error}</div>
                            ))}
                        </div>
                        <div className="new__channel__input">
                            <label>Name</label>
                            <input
                                type="text"
                                name="channel_name"
                                placeholder="# e.g.plan-budget"
                                onChange={e => setChannelName(e.target.value.toLowerCase().split(" ").join("-"))}
                                value={channelName}
                                required
                            ></input>
                        </div>
                        <div className="channel__private__info">
                            <h3>Make private</h3>
                            <div>
                                <p>When a channel is set to private, it can <br /> only be viewed or joined by invitation.</p>
                                <div className="channel__type__switch">
                                    <label className="switch">
                                        <input
                                            id="checkbox__switch"
                                            name="channel_type"
                                            type="checkbox"
                                            onChange={toggleChannelType}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="channel__form__button">
                            <button style={{ cursor: 'pointer' }} type="submit">Create a channel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}





export default ChannelModal;
