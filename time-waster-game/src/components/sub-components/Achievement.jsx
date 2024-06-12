import React from "react";
import "../css/achievements.css";

function Achievement({ name, image, description, key }) {
    return (
        <div>
            <div>{name}</div>
            <img className="achievementImage" src={image} alt={description} />
        </div>
    );
}

export default Achievement;
