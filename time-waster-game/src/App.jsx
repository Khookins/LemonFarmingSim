import { Howl, Howler } from "howler";
import { useEffect, useState, useRef } from "react";
import "./App.css";
import Tabber from "./components/Tabber.jsx";
import Tab from "./components/sub-components/Tab.jsx";
import Home from "./components/pages/Home.jsx";
import LemonCounter from "./components/LemonCounter.jsx";
import ConfirmationDialog from "./components/sub-components/ConfirmationDialog.jsx";
import lemonBGM from "./assets/audio/llaml.mp3";
import Achievements from "./components/pages/Achievements.jsx";

function App() {
    // vars and stuff

    const lemonMusic = new Howl({ src: lemonBGM, preload: true, loop: true });

    // useState
    const [count, setCount] = useState(
        localStorage.getItem("lemons") == null
            ? 0
            : localStorage.getItem("lemons")
    );
    const [harvestAmount, setHarvestAmount] = useState(0);
    const [lemonHarvestLevel, setLemonHarvestLevel] = useState(
        localStorage.getItem("lemonHarvestLevel") == null
            ? 1
            : localStorage.getItem("lemonHarvestLevel")
    );
    const [resetDialogVisible, setResetDialogVisible] = useState(false);
    const [musicDialogVisible, setMusicDialogVisible] = useState(true);

    //let's useRef for upgrade price, because it gets updated in useEffect and doesn't need to trigger a re-render
    //useRef is like saying "this is a variable that doesn't trigger a re-render when it changes, but it can still be accessed and changed from anywhere in the component"
    const [lemonHarvestUpgradePrice, setLemonHarvestUpgradePrice] = useState(
        localStorage.getItem("lemonHarvestUpgradePrice") == null
            ? 500
            : localStorage.getItem("lemonHarvestUpgradePrice")
    );
    const [currentPage, setCurrentPage] = useState("Home");

    useEffect(() => {
        //useEffect when count changes
        localStorage.setItem("lemons", String(count));
        console.log("COUNT CHANGED! " + count);
    }, [count]);

    useEffect(() => {
        localStorage.setItem(
            "lemonHarvestUpgradePrice",
            lemonHarvestUpgradePrice
        );
    }, [lemonHarvestUpgradePrice]);

    useEffect(() => {
        var updatePrice = false; // let's check if the price needs to be updated
        const oldLevel = Number(localStorage.getItem("lemonHarvestLevel"));
        if (oldLevel != lemonHarvestLevel && oldLevel > 0) {
            updatePrice = true;
            console.log("LemonHarvestLevel changed! " + lemonHarvestLevel);
        } else {
            console.log(
                "This is probably running due to a re-render, don't update the price!"
            );
        }

        //useEffect when lemonHarvestLevel changes
        localStorage.setItem("lemonHarvestLevel", lemonHarvestLevel);

        //handle the lemonHarvestUpgradePrice changes, after the lemonHarvestLevel changes
        if (lemonHarvestLevel == 25) {
            setLemonHarvestUpgradePrice("MAX");
        } else if (updatePrice) {
            changeUpgradePrice(Number(lemonHarvestUpgradePrice)); //update the lemonharvestupgradeprice
        }
        localStorage.setItem(
            "lemonHarvestUpgradePrice",
            lemonHarvestUpgradePrice
        ); //save using updated price

        //finally, set the new harvest amount, which will trigger a re-render
        setHarvestAmount(Number(lemonHarvestLevel)); // More additions to harvest amount later
    }, [lemonHarvestLevel]);

    function changeUpgradePrice(oldUpgradePrice) {
        if (oldUpgradePrice >= 1500 && oldUpgradePrice < 2000) {
            setLemonHarvestUpgradePrice(oldUpgradePrice + 500);
        } else if (oldUpgradePrice >= 2000 && oldUpgradePrice < 5000) {
            setLemonHarvestUpgradePrice(oldUpgradePrice + 1000);
        } else if (oldUpgradePrice >= 5000) {
            setLemonHarvestUpgradePrice(oldUpgradePrice + 5000);
        } else {
            setLemonHarvestUpgradePrice(oldUpgradePrice + 250);
        }
    }
    // KeyListener
    useEffect(() => {
        const handleKeyPress = (e) => {
            console.log(e);
            if (e.key == "L") {
                setCount(Number(count) + 1000000);
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [count]);

    window.onload = () => {
        const BackgroundAudio = new Audio("./assets/llaml.mp3");
        BackgroundAudio.play();
    };

    return (
        <>
            {currentPage == "Home" && (
                <Home
                    count={count}
                    setCount={setCount}
                    harvestAmount={harvestAmount}
                    setHarvestAmount={setHarvestAmount}
                    lemonHarvestLevel={lemonHarvestLevel}
                    setLemonHarvestLevel={setLemonHarvestLevel}
                    lemonHarvestUpgradePrice={lemonHarvestUpgradePrice}
                    setLemonHarvestUpgradePrice={setLemonHarvestUpgradePrice}
                ></Home>
            )}
            {currentPage == "Achievements" && <Achievements></Achievements>}
            <Tabber>
                <Tab
                    text={"Home"}
                    onClick={() => {
                        setCurrentPage("Home");
                    }}
                ></Tab>
                <Tab text={"Auto Harvesting"}></Tab>
                <Tab text={"Investments"}></Tab>
                <Tab
                    text={"Acheivements"}
                    onClick={() => {
                        setCurrentPage("Achievements");
                    }}
                ></Tab>
                <Tab
                    text={"Settings"}
                    onClick={() => {
                        setResetDialogVisible(!resetDialogVisible);
                        setMusicDialogVisible(false);
                    }}
                ></Tab>
            </Tabber>
            <LemonCounter lemons={count}></LemonCounter>
            {resetDialogVisible && (
                <ConfirmationDialog
                    msg={"Reset Progress?"}
                    dialog={
                        "Resetting will permanently remove all your Lemons, Auto Harvesters, Harvesting Levels, Multipliers, current bought Stocks, but will keep all Achievements."
                    }
                    cancelMsg={"No! I Want To Keep My Lemons!"}
                    confirmMsg={"Yes, Reset All My Lemons."}
                    onCancel={() => {
                        setResetDialogVisible(false);
                    }}
                    onConfirm={() => {
                        localStorage.clear();
                        location.reload();
                    }}
                ></ConfirmationDialog>
            )}
            {musicDialogVisible && (
                <ConfirmationDialog
                    msg={"Enable Music?"}
                    dialog={
                        "This Will Enable Background Music (This Can Be Changed In The Settings Later On)"
                    }
                    cancelMsg={"No, I Don't Want To Play Music"}
                    confirmMsg={"Yes, I Want To Play Music"}
                    onCancel={() => {
                        setMusicDialogVisible(false);
                    }}
                    onConfirm={() => {
                        lemonMusic.stop();
                        lemonMusic.play();
                        setMusicDialogVisible(false);
                    }}
                ></ConfirmationDialog>
            )}
        </>
    );
}

export default App;
