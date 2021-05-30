import React, { useState } from 'react';
import { useEffect } from 'react';
import "./SidebarOptions.css";

const SidebarOptions = ({ Icon, title, id }) => {
    const [cursor, setCursor] = useState("pointer");
    const [removeHover, setRemoveHover] = useState("");
    useEffect(() => {
        if (title === "Threads" || title === "All DMs" || title === "Mentions & reactions" || title === "Saved items") {
            setCursor("default");
            setRemoveHover("remove__hover");
        }
    }, [title])

    return (
        // TODO: Add onClick when the Div is clicked
        <div className={`options ${removeHover}`} style={{ cursor: `${cursor}` }} >
            {Icon && <Icon className="options__icon" />}
            {Icon ? <h3>{title}</h3> : (
                <h3 className="options__channel">
                    <span className="options__hash"> # </span>
                    {title}
                </h3>
            )}
        </div>
    )
}

export default SidebarOptions;
