import React from "react";
import Tab from "./Tab";
import "./css/tabber.css";

const styles = {};

function Tabber() {
    return (
        <div className="tabber">
            <Tab text={"Home"}></Tab>
            <Tab text={"Auto Harvesting"}></Tab>
            <Tab text={"Investments"}></Tab>
            <Tab text={"Settings"}></Tab>
        </div>
    );
}

export default Tabber;
