import {useState} from "react";
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

function Info(props: { isActive: boolean, setActive: Function }) {
  const TOP_POS = window.isAndroid ? 107 : 80;

  return (
    <div
      className={`absolute bg-white transition-all duration-500  h-full left-0 right-0  rounded-3xl `}
         style={{top: props.isActive ? TOP_POS : "100%"}}
    >
      <div className="h-full px-[24px] pt-2 pb-[280px] ">
        <div className="w-[40px] h-[4px] bg-primary opacity-30 rounded m-auto"></div>
        <h2 className="text-2xl font-bold text-primary text-center mt-2">
          Характеристики объекта
        </h2>
        <h3 className="text-xs text-center text-[#B2ABAB] pb-2 border-solid border-b-2 border-[#E6EDEE]">
          Территория объекта относится к{" "}
          <span className="text-secondary">II категории содержания</span>
        </h3>
        <div className="h-full overflow-y-scroll">
          <div className="bg-[#F2F6F6] rounded-[15px] px-[18px] py-[16px] mt-[12px] active:bg-[#CCDADC] transition-all">
            <dl className='flex justify-between text-primary font-bold'>
              <dt>Общая площадь</dt>
              <dd>12 345 кв.м</dd>
            </dl>
          </div>
          <div className=" bg-[#F2F6F6] rounded-[15px] px-[18px] py-[16px] mt-[12px] active:bg-[#CCDADC] transition-all">
            <input className='accordion' id='one' type='checkbox'/>
            <label htmlFor='one' className=''>
              <div className='flex text-primary font-bold'>
                <div className='pr-2 '>
                  <svg className='accordion-arrow h-full transition-all' xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
                    <path d="M0 11L-4.80825e-07 0L7 5.5L0 11Z" fill="#024751"/>
                  </svg>
                </div>
                <p>Общая площадь</p>
                <span className='block flex-1 text-right'>12 345 кв.м</span>
              </div>
              <ul className='hidden accordion-item border-t-2 border-[#E6EDEE] mt-2 pt-1'>
                <li className='flex text-primary gap-1 mt-1'>
                  <p className='pl-[15px]'>Деревья</p>
                  <div className='basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted'></div>
                  <span className='block whitespace-nowrap'>50 шт</span>
                </li>
                <li className='flex text-primary gap-1 mt-1'>
                  <p className='pl-[15px]'>Деревья</p>
                  <div className='basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted'></div>
                  <span className='block whitespace-nowrap'>50 шт</span>
                </li>
                <li className='flex text-primary gap-1 mt-1'>
                  <p className='pl-[15px]'>Деревья</p>
                  <div className='basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted'></div>
                  <span className='block whitespace-nowrap'>50 шт</span>
                </li>
              </ul>
            </label>
          </div>
        </div>
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
      <Info isActive={active === 1} setActive={setActive} />
      <div
        className={`absolute max-w-sm h-[66px] w-full px-4 left-1/2 -translate-x-1/2 flex transition-all duration-500 ${
          props.hideActionBar ? "-bottom-24" : "bottom-8"
        }`}
      >
        <ul className="flex justify-around items-center w-full h-full -mr-[3px] bg-primary rounded-l-full max-w-xs">
          <li className="">
            <HomeButton
              id={0}
              isActive={active === 0}
              onClick={onClickButton}
            />
          </li>
          <li className="">
            <InfoButton
              id={1}
              isActive={active === 1}
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
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 0H0V69H87V0H84C84 22.0914 65.8676 40 43.5 40C21.1324 40 3 22.0914 3 0Z"
            />
          </svg>
          <AddButton />
        </div>
        <ul className="flex justify-evenly items-center w-full h-full -ml-[3px] bg-primary rounded-r-full max-w-xs">
          <li className="">
            <BellButton
              id={2}
              isActive={active === 2}
              onClick={onClickButton}
            />
          </li>
          <li className="">
            <SettingsButton
              id={3}
              isActive={active === 3}
              onClick={onClickButton}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
