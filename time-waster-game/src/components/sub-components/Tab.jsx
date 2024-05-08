import React from "react";
import "./../css/tab.css";

// const styles = { border: "1px solid yellow", color: "yellow" }; old css

function Tab(props) {
    return (
        <div className="tab" onClick={props.onClick}>
            {props.text}
        </div>
    );
}

export default Tab;
