import React from "react";
import "./css/tab.css";

// const styles = { border: "1px solid yellow", color: "yellow" }; old css

function Tab(props) {
    return (
        <div
            className="tab"
            onClick={() => {
                if (props.text == "Home") return;
                alert("This Is A Feature Not Added Yet (" + props.text + ")");
            }}
        >
            {props.text}
        </div>
    );
}

export default Tab;
