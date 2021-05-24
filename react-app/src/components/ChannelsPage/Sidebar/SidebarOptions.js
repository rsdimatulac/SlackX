import React from 'react';
import "./SidebarOptions.css";

const SidebarOptions = ({ Icon, title, id }) => {
    return (
        // TODO: Add onClick when the Div is clicked
        <div className="options" >
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
