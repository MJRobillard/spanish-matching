import { useEffect, useState } from "react";
import Combo from "./Combo";
import Records from "./Records";
import Square from "./Square";
import { nanoid } from "nanoid";
import englishSpanish from "./data/spanish_dic";


const total = length(englishSpanish[0]);

export default function Main() {
  const [squares, setSquare] = useState(randomNumber());
  const [selectedNo, setSelectedNo] = useState(Math.ceil(Math.random() * total));
  const [won, setWon] = useState(false);
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [records, setRecords] = useState(
    JSON.parse(localStorage.getItem("matching-game") || "[]")
  );
  const [squareStyles, setSquareStyles] = useState("numbers");

  const [autoWin, setAutoWin] = useState(false);

  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  function randomNumber() {
    let newSquares = [];
    for (let index = 0; index < 9; index++) {
      newSquares.push({
        id: nanoid(),
        location: index,
        number: Math.ceil(Math.random() * total),
        isEnabled: false,
      });
    }
    return newSquares;
  }
  function toggleSquare(id) {
    setStart(true);
    setSquare((oldData) => {
      return oldData.map((data) => {
        return {
          ...data,
          isEnabled:
            id === data.id && data.number === selectedNo
              ? !data.isEnabled
              : data.isEnabled,
        };
      });
    });
  
    // Reset the word to match without resetting the grid
    const enabledNumbers = squares.filter((data) => !data.isEnabled);
    console.log(enabledNumbers,'look;');
    const random_num = Math.floor(Math.random() * enabledNumbers.length)
    setSelectedNo(enabledNumbers[random_num].number)
  }

  useEffect(() => {
    const checkWin = squares.every((data) => data.isEnabled);
    const remainingFalse = squares.filter((data) => !data.isEnabled);

    if (
      remainingFalse.length === 1 &&
      autoWin &&
      remainingFalse[0].number === selectedNo &&
      !won
    ) {
      setWon(true);
      setStart(false);
      let newRecords = [
        ...records,
        { id: nanoid(), time: count, date: formattedDate },
      ];
      localStorage.setItem("matching-game", JSON.stringify(newRecords));
      setRecords(newRecords);
    } else {
      if (checkWin && !won) {
        setWon(true);
        setStart(false);
        let newRecords = [
          ...records,
          { id: nanoid(), time: count, date: formattedDate },
        ];
        localStorage.setItem("matching-game", JSON.stringify(newRecords));
        setRecords(newRecords);
      }
    }
  }, [squares]);

  function resetAll() {
    setSquare(randomNumber());
    setSelectedNo(Math.ceil(Math.random() * total));
    setWon(false);
    setStart(false);
    setCount(0);
  }

  function randomizeSquares() {
    setSquare((oldData) => {
      return oldData.map((data) => {
        return {
          ...data,
          number: data.isEnabled ? data.number : Math.ceil(Math.random() * total),
        };
      });
    });
  }

  function toggleAuto() {
    setAutoWin((oldData) => !oldData);
  }

  function handleStyles(event){
    setSquareStyles(event.target.value)
  }

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      event.key === "r" && randomizeSquares();
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="relative flex flex-col gap-2 items-center">
        <p className="absolute -top-8 text-xs text-zinc-600 text-center">
          <strong>Note:</strong> Match the {`${squareStyles}`}. The timer will
          start once you tap a box.
        </p>
        <Records listRecords={records} />
        {won ? (
          <div className="relative w-60 sm:w-72 bg-zinc-100 bg-opacity-5 flex flex-col justify-center items-center rounded-md">
            <div className=" text-white flex items-center gap-1">
              <p>Time:</p>
              <div className=" bg-emerald-600 px-2 rounded-md">
                {count / 100}s
              </div>
            </div>
            <div className="bottom-0 my-2 text-xs absolute text-zinc-100 text-opacity-20">
              click{" "}
              <span
                onClick={resetAll}
                className="text-emerald-600 cursor-pointer"
              >
                reset
              </span>{" "}
              to continue
            </div>
          </div>
        ) : (
          <div
            className={`grid grid-cols-3 gap-2 ${
              autoWin ? "border-emerald-500" : "border-white"
            } border rounded-md p-2`}
          >

            {squares.map((data) => {
              return (
                <Square
                  style={squareStyles}
                  isClickable={selectedNo === data.number}
                  loc={data.location}
                  handleToggle={() => toggleSquare(data.id)}
                  key={data.id}
                  number={data.number}
                  enabled={data.isEnabled}
                />
              );
            })}
          </div>
        )}

        <Combo
          style={squareStyles}
          count={count}
          setCounter={setCount}
          played={start}
          handleReset={resetAll}
          selectedNo={selectedNo}
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="w-full sm:w-48 flex gap-2 items-center justify-center text-white">
          <input onChange={toggleAuto} type="checkbox" name="auto" id="auto" />
          <label htmlFor="auto" className="text-xs">
            Auto Tap Last Number
          </label>
        </div>
        <button
          onClick={randomizeSquares}
          className="bg-zinc-700 w-full sm:w-72 border py-1 rounded-sm border-zinc-600 hover:bg-zinc-600 focus:border focus:border-zinc-500 text-white"
        >
          Roll <span className="text-[10px]">(or press R)</span>
        </button>
        <select
          onChange={handleStyles}
          name="styles"
          value={squareStyles}
          className="w-full sm:w-48 border bg-zinc-700 py-1 px-2 rounded-sm border-zinc-600 hover:bg-zinc-600 focus:border focus:border-zinc-500 text-white"
        >
          <option value="numbers">Numbers 1️⃣</option>
          <option value="emojis">Emojis 🗿</option>
          <option value="letters">Letters 🅰️</option>
        </select>
      </div>
    </div>
  );
}