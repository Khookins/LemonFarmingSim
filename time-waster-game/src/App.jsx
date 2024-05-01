import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // useState

  const [count, setCount] = useState(
    localStorage.getItem("lemons") == null ? 0 : localStorage.getItem("lemons")
  );
  const [harvestAmount, setHarvestAmount] = useState(1);
  const [lemonHarvestLevel, setLemonHarvestLevel] = useState(
    localStorage.getItem("lemonHarvestLevel") == null
      ? 0
      : localStorage.getItem("lemonHarvestLevel")
  );
  const [lemonHarvestUpgradePrice, setLemonHarvestUpgradePrice] = useState(500);

  // useEffect

  useEffect(() => {
    localStorage.setItem("lemons", String(count));
    localStorage.setItem("lemonHarvestLevel", lemonHarvestLevel);
    setHarvestAmount(1 + Number(lemonHarvestLevel)); // More additions to harvest amount later

    console.log(harvestAmount);
    console.log(lemonHarvestLevel);
  }, [lemonHarvestLevel]);

  return (
    <>
      <div></div>
      <h1>{"Your Lemons: " + count}</h1>
      <div className="card">
        <button
          onClick={() => {
            console.log(
              "I COUNTING " + count + " AND SILLY NUMBER " + harvestAmount
            );
            setCount((count) => Number(count) + Number(harvestAmount));
          }}
        >
          Harvest Lemons
        </button>
        <button
          onClick={() => {
            if (count < lemonHarvestUpgradePrice) return;
            setLemonHarvestLevel(Number(lemonHarvestLevel) + 1);
            console.log(
              "I SET THE SILLY LEVEL TO " + lemonHarvestLevel + "+" + 1
            );
            setCount((count) => Number(count) - lemonHarvestUpgradePrice);
            useEffect(
              setLemonHarvestUpgradePrice(lemonHarvestUpgradePrice + 250)
            );
          }}
        >
          Upgrade Lemon Harvest ({lemonHarvestUpgradePrice})
        </button>
        <p>You're Getting {harvestAmount} Lemons Per Harvest</p>
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

export default App;
