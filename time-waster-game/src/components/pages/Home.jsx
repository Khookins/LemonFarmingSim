import { useEffect, useState, useRef } from "react";
import buyingSFX from "../../assets/audio/Buying Sound Effect.mp3";
import lemonSFX from "../../assets/audio/lemon (edited).mp3";

function Home({
    count,
    setCount,
    harvestAmount,
    setHarvestAmount,
    lemonHarvestLevel,
    setLemonHarvestLevel,
    lemonHarvestUpgradePrice,
    setLemonHarvestUpgradePrice,
}) {
    const buyingAudio = new Audio(buyingSFX);
    const lemonAudio = new Audio(lemonSFX);

    function playAudio(audio) {
        audio.play();
    }

    return (
        <>
            <div></div>
            <h1>{"Your Lemons: " + count}</h1>
            <div className="card">
                <button
                    onClick={() => {
                        console.log(
                            "I COUNTING " +
                                count +
                                " AND SILLY NUMBER " +
                                harvestAmount
                        );
                        setCount(
                            (count) => Number(count) + Number(harvestAmount)
                        );
                        playAudio(lemonAudio);
                    }}
                >
                    Harvest Lemons
                </button>
                <button
                    onClick={() => {
                        if (count < lemonHarvestUpgradePrice) return;
                        if (lemonHarvestUpgradePrice == "MAX") return;
                        setLemonHarvestLevel(Number(lemonHarvestLevel) + 1);
                        console.log(
                            "I SET THE SILLY LEVEL TO " +
                                lemonHarvestLevel +
                                "+" +
                                1
                        );
                        setCount(
                            (count) => Number(count) - lemonHarvestUpgradePrice
                        );
                        playAudio(buyingAudio);
                    }}
                >
                    Upgrade Lemon Harvest ({lemonHarvestUpgradePrice})
                </button>
                <p>
                    You're Getting {harvestAmount} Lemon
                    {harvestAmount > 1 ? "s" : null} Per Harvest
                </p>
            </div>
            <p className="read-the-docs">Go To Settings To Reset Progress</p>
        </>
    );
}

export default Home;
