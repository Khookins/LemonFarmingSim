import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import buyingSFX from "./assets/Buying Sound Effect.mp3";
import "./App.css";

function App() {
  // vars and stuff

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

  //let's useRef for upgrade price, because it gets updated in useEffect and doesn't need to trigger a re-render
  //useRef is like saying "this is a variable that doesn't trigger a re-render when it changes, but it can still be accessed and changed from anywhere in the component"
  const [lemonHarvestUpgradePrice, setLemonHarvestUpgradePrice] = useState(
    localStorage.getItem("lemonHarvestUpgradePrice") == null
      ? 500
      : localStorage.getItem("lemonHarvestUpgradePrice")
  );

  useEffect(() => {
    //useEffect when count changes
    localStorage.setItem("lemons", String(count));
    console.log("COUNT CHANGED! " + count);
  }, [count]);

  useEffect(() => {
    var updatePrice = false; // let's check if the price needs to be updated
    const oldLevel = Number(localStorage.getItem("lemonHarvestLevel"));
    if (oldLevel != lemonHarvestLevel) {
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
    localStorage.setItem("lemonHarvestUpgradePrice", lemonHarvestUpgradePrice); //save using updated price

    //finally, set the new harvest amount, which will trigger a re-render
    setHarvestAmount(1 + Number(lemonHarvestLevel)); // More additions to harvest amount later
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
            playBuySound(audio);
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
