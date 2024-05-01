import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(
    localStorage.getItem("lemons") == null ? 0 : localStorage.getItem("lemons")
  );
  const [harvestAmount, setHarvestAmount] = useState(1);
  const [lemonHarvestLevel, setLemonHarvestLevel] = useState(
    localStorage.getItem("lemonHarvestLevel") == null
      ? 0
      : localStorage.getItem("lemonHarvestLevel")
  );
  useEffect(() => {
    localStorage.setItem("lemons", String(count));
    localStorage.setItem("lemonHarvestLevel", lemonHarvestLevel);
    setHarvestAmount(harvestAmount + lemonHarvestLevel); // More additions to harvest amount later

    console.log(harvestAmount);
    console.log(lemonHarvestLevel);
  }, [lemonHarvestLevel]);

  return (
    <>
      <div></div>
      <h1>{"Your Lemons: " + count}</h1>
      <div className="card">
        <button
          onClick={() =>
            setCount((count) => Number(count) + Number(harvestAmount))
          }
        >
          count is {count}
        </button>
        <button
          onClick={() => {
            if (count <= 500) return;
            setLemonHarvestLevel(Number(lemonHarvestLevel) + 1);
            setCount((count) => Number(count) - 500);
          }}
        >
          Upgrade Lemon Harvest (500)
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p
        onClick={() => {
          localStorage.clear();
          location.reload();
        }}
        className="read-the-docs"
      >
        Click here to reset (You Made It NaN Again Didn't You?)
      </p>
    </>
  );
}

export default App;
