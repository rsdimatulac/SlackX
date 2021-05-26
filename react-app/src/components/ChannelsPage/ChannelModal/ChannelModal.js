import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChannel } from "../../../store/channel";
import useConsumeContext from "../../../context/FormModalContext";
import { Modal } from "../../../context/Modal";
import "./ChannelModal.css"


const ChannelModal = () => {
    const [channelName, setChannelName] = useState("");
    const [channelType, setChannelType] = useState("public");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    
    const toggleChannelType = (e) => {
        if (e.target.checked) { // true
            setChannelType("private")
        } else { // false, not checked
            setChannelType("public")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("DATAAAA", channelName, channelType)
        const data = await dispatch(createChannel(channelName, channelType));
        if (data?.errors) {
            setErrors(data?.errors);
        }
    }

    return (
        <>
            <Modal onClose={""}>
                <div className="channel__form">
                    <form onSubmit={handleSubmit}>
                        <div className="channel__form__header">
                            <h1>Create a channel</h1>
                            <p>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</p>
                        </div>
                        <div className="errors">
                            {/* <div>・error1</div>
                            <div>・error2</div>
                            <div>・error3</div> */}

                            {errors?.map((error) => (
                                <div key={error}>・{error}</div>
                            ))}
                        </div>
                        <div className="new__channel__input">
                            <input
                                type="text"
                                name="channel_name"
                                placeholder="# e.g.plan-budget"
                                onChange={e => setChannelName(e.target.value)}
                                value={channelName}
                                required
                            ></input>
                        </div>
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
