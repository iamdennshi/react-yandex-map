import { useState } from "react";
import AddButton from "./AddButton";
import settingsIcon from "../assets/settings-icon.svg";
import bellIcon from "../assets/bell-icon.svg";
import infoIcon from "../assets/info-icon.svg";
import homeIcon from "../assets/home-icon.svg";

interface ActionProps {
  id: number;
  isActive: boolean;
  onClick: Function;
}

function HomeButton(props: ActionProps) {
  return (
    <button
      onClick={() => props.onClick(props.id)}
      className={`relative block p-2 cursor-pointer z-20`}
    >
      <div
        className={`absolute -z-10 inset-0 transition duration-500 w-full h-full rounded-full ${
          props.isActive ? "bg-secondary button-shadow--active sca" : "scale-0"
        } `}
      ></div>
      <div className="active:scale-90 transition">
        {" "}
        <img
          draggable="false"
          className={`${props.isActive == false && "opacity-30"}`}
          src={homeIcon}
          alt=""
        />
      </div>
    </button>
  );
}

function InfoButton(props: ActionProps) {
  return (
    <button
      onClick={() => props.onClick(props.id)}
      className={`relative block p-2 cursor-pointer z-20`}
    >
      <div
        className={`absolute -z-10 inset-0 transition duration-500 w-full h-full rounded-full ${
          props.isActive ? "bg-secondary button-shadow--active sca" : "scale-0"
        } `}
      ></div>
      <div className="active:scale-90 transition">
        <img
          draggable="false"
          className={`${props.isActive == false && "opacity-30"}`}
          src={infoIcon}
          alt=""
        />
      </div>
    </button>
  );
}

function BellButton(props: ActionProps) {
  return (
    <button
      onClick={() => props.onClick(props.id)}
      className={`relative block p-2 cursor-pointer z-20`}
    >
      <div
        className={`absolute -z-10 inset-0 transition duration-500 w-full h-full rounded-full ${
          props.isActive ? "bg-secondary button-shadow--active sca" : "scale-0"
        } `}
      ></div>
      <div className="active:scale-90 transition">
        <img
          draggable="false"
          className={`${props.isActive == false && "opacity-30"}`}
          src={bellIcon}
          alt=""
        />
      </div>
    </button>
  );
}

function SettingsButton(props: ActionProps) {
  return (
    <button
      onClick={() => props.onClick(props.id)}
      className={`relative block p-2 cursor-pointer z-20`}
    >
      <div
        className={`absolute -z-10 inset-0 transition duration-500 w-full h-full rounded-full ${
          props.isActive ? "bg-secondary button-shadow--active sca" : "scale-0"
        } `}
      ></div>
      <div className="active:scale-90 transition">
        <img
          draggable="false"
          className={`${props.isActive == false && "opacity-30"}`}
          src={settingsIcon}
          alt=""
        />
      </div>
    </button>
  );
}

function Info(props: { isActive: boolean }) {
  return (
    <div
      className={`absolute bg-white  h-full left-0 right-0 transition-all duration-500 ${
        props.isActive ? "top-0" : "top-full"
      }`}
    >
      <div className="  h-[520px] w-[360px] m-auto mt-[84px] px-6">
        <h2 className="text-2xl font-bold text-primary text-center">
          Характеристики объекта
        </h2>
        <h3 className="text-xs text-center text-[#B2ABAB] pb-2 border-solid border-b-2 border-[#B2ABA]">
          Территория объекта{" "}
          <span className="text-secondary">II категории содержания</span>
        </h3>
      </div>
    </div>
  );
}

export default function ActionBar(props: ActionBarProps) {
  const [active, setActive] = useState(0);

  const onClickButton = (id: number) => {
    setActive(id);
  };

  return (
    <>
      <Info isActive={active === 1 ? true : false} />
      <div
        className={`absolute max-w-sm h-[66px] w-full px-4 left-1/2 -translate-x-1/2 flex transition-all duration-500 ${
          props.hideActionBar ? "-bottom-24" : "bottom-8"
        }`}
      >
        <ul className="flex justify-around items-center w-full h-full -mr-[3px] bg-primary rounded-l-full max-w-xs">
          <li className="">
            <HomeButton
              id={0}
              isActive={active === 0 ? true : false}
              onClick={onClickButton}
            />
          </li>
          <li className="">
            <InfoButton
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
            fill="#024751"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 0H0V69H87V0H84C84 22.0914 65.8676 40 43.5 40C21.1324 40 3 22.0914 3 0Z"
            />
          </svg>
          <AddButton />
        </div>
        <ul className="flex justify-evenly items-center w-full h-full -ml-[3px] bg-primary rounded-r-full max-w-xs">
          <li className="">
            <BellButton
              id={2}
              isActive={active === 2 ? true : false}
              onClick={onClickButton}
            />
          </li>
          <li className="">
            <SettingsButton
              id={3}
              isActive={active === 3 ? true : false}
              onClick={onClickButton}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
