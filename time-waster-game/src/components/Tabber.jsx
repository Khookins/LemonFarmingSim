import React from "react";
import Tab from "./sub-components/Tab";
import "./css/tabber.css";

const styles = {};

function Tabber(props) {
    return <div className="tabber">{props.children}</div>;
}

export default Tabber;
