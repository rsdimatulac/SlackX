import React, { useState } from 'react';
import { IoMdSend as SendButton } from "react-icons/io";
import "./ChatInput.css";

function ChatInput( { sendChat, updateChatInput, chatInput } ) {





    return (
        <div className="chat__input">
            <div className="input__wrap">
                <form method="post" action="" onSubmit={sendChat}>
                        <input
                            className="input__box"
                            placeholder={"Message #channel-name or user firstname"}
                            // placeholder={`Message #${channelName}`}
                            value={ chatInput }
                            onChange={ updateChatInput }
                        />
                    {chatInput ?
                        <button className="send__button enabled" type="submit"><SendButton /></button>
                        :
                        <button className="send__button" disabled={true}><SendButton /></button>
                    }
                </form>
            </div>
        </div>
    )
}

export default ChatInput
