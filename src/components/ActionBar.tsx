import { useState } from "react";
import AddButton from "./AddButton";

interface HomeButtonProps {
  id: number;
  isActive: boolean;
  onClick: Function;
}

function HomeButton(props: HomeButtonProps) {
  const color = props.isActive ? "#fff" : "#649fa9";

  return (
    <button
      onClick={() => props.onClick(props.id)}
      className={`relative block p-2 cursor-pointer z-20`}
    >
      <div
        className={`absolute -z-10 inset-0 transition duration-500 w-full h-full rounded-full ${
          props.isActive ? "bg-green-500 button-shadow--active sca" : "scale-0"
        } `}
      ></div>
      <div className="active:scale-90 transition">
        <svg
          className="transition duration-500"
          viewBox="0 0 1024 1024"
          fill={`${color}`}
          height="2em"
          width="2em"
        >
          <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
        </svg>
      </div>
    </button>
  );
}

export default function ActionBar(props: ActionBarProps) {
  const [active, setActive] = useState(0);

  const onClickButton = (id: number) => {
    setActive(id);
  };

  return (
    <div
      className={`absolute max-w-sm h-[66px] w-full px-4 left-1/2 -translate-x-1/2 flex transition-all duration-500 ${
        props.hideActionBar ? "-bottom-24" : "bottom-8"
      }`}
    >
      <ul className="flex justify-around items-center w-full h-full -mr-[3px] bg-[#236e78] rounded-l-full max-w-xs">
        <li className="">
          <HomeButton
            id={0}
            isActive={active === 0 ? true : false}
            onClick={onClickButton}
          />
        </li>
        <li className="">
          <HomeButton
            id={1}
            isActive={active === 1 ? true : false}
            onClick={onClickButton}
          />
        </li>
      </ul>
      <div className="relative bottom-[5px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="87"
          height="71"
          viewBox="0 0 87 55"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 0H0V69H87V0H84C84 22.0914 65.8676 40 43.5 40C21.1324 40 3 22.0914 3 0Z"
            fill="#236e78"
          />
        </svg>
        <AddButton />
      </div>
      <ul className="flex justify-evenly items-center w-full h-full -ml-[3px] bg-[#236e78] rounded-r-full max-w-xs">
        <li className="">
          <HomeButton
            id={2}
            isActive={active === 2 ? true : false}
            onClick={onClickButton}
          />
        </li>
        <li className="">
          <HomeButton
            id={3}
            isActive={active === 3 ? true : false}
            onClick={onClickButton}
          />
        </li>
      </ul>
    </div>
  );
}
