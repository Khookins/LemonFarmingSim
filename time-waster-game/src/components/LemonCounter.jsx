import React from "react";
import "./css/lemonCounter.css";

function LemonCounter(props) {
    return <div className="lemonCounter">{props.lemons}</div>;
}

export default LemonCounter;
