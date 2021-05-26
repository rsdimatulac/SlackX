import React, { useState } from "react";
import useConsumeContext from "../../../context/FormModalContext";
import { Modal } from "../../../context/Modal";
import "./ChannelModal.css"


const ChannelModal = () => {
    const [channelName, setChannelName] = useState("");
    const [channelType, setChannelType] = useState("private");
    const [errors, setErrors] = useState([]);
    const toggleChannelType = (e) => {
        if (e.target.value === "private") {
            setChannelType("private")
            console.log(channelType, "insideIf")
        } else if (e.target.value === "public") {
            setChannelType("public")
            console.log(channelType, "minion")
        }
        // console.log(channelType, "type")
        // if (channelType === "public")

    }

    return (
        <>
            <Modal>
                <div>
                    <form>
                        <div>
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
                        <div className="newChannel__input">
                            <input
                                type="text"
                                name="channel_name"
                                placeholder="# e.g.plan-budget"
                                onChange={e => setChannelName(e.target.value)}
                                value={channelName}
                                required
                            ></input>
                        </div>
                        <div className="type__switch">
                            <label className="switch">
                                <input
                                    id="checkbox__switch"
                                    name="channel_type"
                                    type="checkbox"
                                    onChange={toggleChannelType}
                                    // checked="private"
                                    value={channelType}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>

                    </form>
                </div>
            </Modal>
        </>
    )
}





export default ChannelModal;
