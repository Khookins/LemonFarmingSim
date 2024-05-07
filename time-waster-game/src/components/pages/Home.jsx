import { useEffect, useState, useRef } from "react";
import buyingSFX from "../../assets/Buying Sound Effect.mp3";

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
    function playBuySound() {
        new Audio(buyingSFX).play();
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
                        playBuySound(audio);
                    }}
                >
                    Upgrade Lemon Harvest ({lemonHarvestUpgradePrice})
                </button>
                <p>
                    You're Getting {harvestAmount} Lemon
                    {harvestAmount > 1 ? "s" : null} Per Harvest
                </p>
            </div>
            <p
                onClick={() => {
                    localStorage.clear();
                    location.reload();
                }}
                className="read-the-docs"
            >
                Click here to reset your progress
            </p>
        </>
    );
}

export default Home;
