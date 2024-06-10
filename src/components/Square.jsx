import squareStyles from "./data/square_styles";
import englishSpanish from "./data/spanish_dic";

export default function Square(props) {
  let styles = props.enabled
    ? "bg-emerald-600 border border-emerald-500"
    : props.isClickable
    ? "bg-zinc-700 border border-zinc-600 hover:bg-emerald-600 hover:bg-opacity-10 hover:border-emerald-600"
    : "bg-zinc-700 border border-zinc-600 hover:bg-red-600 hover:bg-opacity-10 hover:border-red-600";

  let roundedClass;
  if (props.loc === 0) {
    roundedClass = "rounded-tl-md";
  } else if (props.loc === 2) {
    roundedClass = "rounded-tr-md";
  } else if (props.loc === 6) {
    roundedClass = "rounded-bl-md";
  } else if (props.loc === 8) {
    roundedClass = "rounded-br-md";
  } else {
    roundedClass = "";
  }

  function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }
  function getRandomBinary() {
    const randomValue = seededRandom(props.loc);
    return randomValue < 0.5 ? 0 : 1;
  }
  // Assuming `data` variable in your code is `props`


  return (
    <div
      onClick={props.handleToggle}
      className={`${styles} ${roundedClass} h-24 w-24 sm:h-32 sm:w-32 flex items-center justify-center text-1xl sm:text-2xl text-white cursor-pointer`}
    >
      {englishSpanish[1][props.number]}
    </div>
  );
}
