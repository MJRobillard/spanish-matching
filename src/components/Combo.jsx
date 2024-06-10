import { useState, useEffect } from "react";
import square_styles from "./data/square_styles";
import englishSpanish from "./data/spanish_dic";
export default function Combo(props) {
  useEffect(() => {
    if (props.played) {
      const interval = setInterval(() => {
        props.setCounter(props.count + 1);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [props.played, props.count]);
  function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }
  function getRandomBinary(select) {
    console.log(select);
    return 0;
  }
  // Assuming `data` variable in your code is `props`



  return (
    <div className="relative w-48 h-72">
      <div
        className={`h-[12%] ${
          props.played ? "bg-emerald-700" : "bg-zinc-700"
        } text-white rounded-t-sm py-1 flex justify-center items-center gap-1`}
        align="center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {(props.count / 100).toFixed(2)}
      </div>

      <div className="h-[76%] flex items-center justify-center bg-zinc-2 bg-opacity-5">
        <div className=" text-white text-2xl">
          {englishSpanish[getRandomBinary(props.selectedNo)][props.selectedNo]}

        </div>
      </div>

      <button
        onClick={props.handleReset}
        className=" bg-emerald-700 rounded-b-sm h-[12%] w-full hover:bg-emerald-500 text-white flex items-center justify-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        Reset
      </button>
    </div>
  );
}
