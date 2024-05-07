import React from "react";
import "./css/tab.css";

// const styles = { border: "1px solid yellow", color: "yellow" }; old css

function Tab(props) {
    return (
        <div
            className="tab"
            onClick={() => {
                alert("Tab Button Clicked! " + props.text);
            }}
        >
            {props.text}
        </div>
    );
}

export default Tab;
