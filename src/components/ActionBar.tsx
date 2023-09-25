import {useEffect, useState} from "react";
import AddButton from "./AddButton";
import settingsIcon from "../assets/settings-icon.svg";
import bellIcon from "../assets/bell-icon.svg";
import infoIcon from "../assets/info-icon.svg";
import homeIcon from "../assets/home-icon.svg";
import {Placemark} from "@pbe/react-yandex-maps";

interface ButtonItemProps {
  id: number;
  isActive: boolean;
  onClick: Function;
  icon : string;
}

interface InfoParams {
  isActive: boolean;
  setActive: Function;
  place: PlaceInfo;
}

function ButtonItem(props: ButtonItemProps) {
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
          src={props.icon}
          alt=""
        />
      </div>
    </button>
  );
}



function Info(props: InfoParams) {
  const TOP_POS = window.isAndroid ? 107 : 80;
  const totalTrees = props.place.trees.length + ' шт'
  const totalFurniture = props.place.furniture.length + ' шт'
  const totalArea = props.place.parameters.totalArea + ' кв.м'



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
              <dd>{totalArea}</dd>
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
                <p>Зеленые насаждения</p>
                <span className='block flex-1 text-right'>{totalTrees}</span>
              </div>
              <ul className='hidden accordion-item border-t-2 border-[#E6EDEE] mt-2 pt-1'>
                <li className='flex text-primary gap-1 mt-1'>
                  <p className='pl-[15px] whitespace-nowrap'>деревьев</p>
                  <div className='basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted'></div>
                  <span className='block whitespace-nowrap'>{totalTrees}</span>
                </li>
                <li className='flex text-primary gap-1 mt-1'>
                  <p className='pl-[15px] whitespace-nowrap'>кустариков</p>
                  <div className='basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted'></div>
                  <span className='block whitespace-nowrap'>0 шт</span>
                </li>
                <li className='flex text-primary gap-1 mt-1'>
                  <p className='pl-[15px] whitespace-nowrap'>цветников</p>
                  <div className='basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted'></div>
                  <span className='block whitespace-nowrap'>0 шт</span>
                </li>
              </ul>

            </label>
          </div>

          <div className=" bg-[#F2F6F6] rounded-[15px] px-[18px] py-[16px] mt-[12px] active:bg-[#CCDADC] transition-all">
            <input className='accordion' id='two' type='checkbox'/>
            <label htmlFor='two' className=''>
              <div className='flex text-primary font-bold'>
                <div className='pr-2 '>
                  <svg className='accordion-arrow h-full transition-all' xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
                    <path d="M0 11L-4.80825e-07 0L7 5.5L0 11Z" fill="#024751"/>
                  </svg>
                </div>
                <p>МАФ</p>
                <span className='block flex-1 text-right'>{totalFurniture}</span>
              </div>
              <ul className='hidden accordion-item border-t-2 border-[#E6EDEE] mt-2 pt-1'>
                <li className='flex text-primary gap-1 mt-1'>
                  <p className='pl-[15px] whitespace-nowrap'>скамьи</p>
                  <div className='basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted'></div>
                  <span className='block whitespace-nowrap'>{totalFurniture}</span>
                </li>
                <li className='flex text-primary gap-1 mt-1'>
                  <p className='pl-[15px] whitespace-nowrap'>урны</p>
                  <div className='basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted'></div>
                  <span className='block whitespace-nowrap'>0 шт</span>
                </li>
                <li className='flex text-primary gap-1 mt-1'>
                  <p className='pl-[15px] whitespace-nowrap'>фанари</p>
                  <div className='basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted'></div>
                  <span className='block whitespace-nowrap'>0 шт</span>
                </li>
              </ul>

            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AddModeProps {
  place: PlaceInfo;
}

function AddMode(props : AddModeProps) {
  const [coordinates, setCoordinates] = useState([0, 0])
  const [showInfo, setShowInfo] = useState(true)
  const [showCoords, seShowCoords] = useState(true)

  return (
      <>
        <Placemark
            instanceRef={(ref) => {
              ref &&
              coordinates[0] == 0 && // To avoid adding extra handlers
              ref.events.add("drag", () => {
                  if (showInfo) {
                    setShowInfo(false)
                  }
                  //@ts-ignore
                  setCoordinates(() => ref.geometry._coordinates)
              }
              )
              &&
              ref.events.add("click", () => {
                if (showInfo) {
                  setShowInfo(false)
                  seShowCoords(false)
                }
              })
            }}
            geometry={props.place.cords}
            options={{
              preset: "islands#darkOrangeCircleIcon",
              hideIconOnBalloonOpen: false,
              iconOffset: [2, 14],
              draggable: true
            }}
        />
        {showInfo &&
        <div className='absolute left-1/2 -translate-x-1/2 top-1/4 z-10 w-[300px] rounded-2xl bg-white px-6 py-8 '>
          <button onClick={() => setShowInfo(false)} className="absolute right-4 top-4 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="#B2ABAB">
              <path d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99833 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941974 9.35021 0.000986589 9.11607 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z" fill="#024751" fill-opacity="0.3"/>
            </svg>
          </button>

          <h3 className='text-center font-bold text-primary'>Расположите маркер</h3>
          <p className='text-center mt-6'>Кликните по нему чтобы зафиксировать координаты</p>
        </div>}
        {showCoords && coordinates[0] != 0 &&
        <div className='absolute left-1/2 -translate-x-1/2 w-[250px] bottom-8 text-center  z-10 bg-primary rounded-2xl
        text-white px-4 py-2'>
            <p>{coordinates[0]}</p>
            <p>{coordinates[1]}</p>
        </div>}
      </>
  )
}

export default function ActionBar(props: ActionBarProps) {
  const [active, setActive] = useState(0);
  const [isAddingMode, setIsAddingMode] = useState(false)


  const onClickButton = (id: number) => {
    setActive(id);
  };

  const onAdd = () => {
    setIsAddingMode(true)
    props.toggleUI()
  }


  // Hide Info when click on seachbar
  useEffect(()=> {
      setActive(0)
  }, [props.hideActionBar])


  return (
    <>
      {isAddingMode && <AddMode place={props.place} />}
      <Info isActive={active === 1} setActive={setActive} place={props.place} />
      <div
        className={`absolute z-10 max-w-sm h-[66px] w-full px-4 left-1/2 -translate-x-1/2 flex transition-all duration-500 ${
          props.hideActionBar ? "-bottom-24" : "bottom-8"
        }`}
      >
        <ul className="flex justify-around items-center w-full h-full -mr-[3px] bg-primary rounded-l-full max-w-xs">
          <li className="">
            <ButtonItem
              id={0}
              isActive={active === 0}
              onClick={onClickButton}
              icon={homeIcon}
            />
          </li>
          <li className="">
            <ButtonItem
              id={1}
              isActive={active === 1}
              onClick={onClickButton}
              icon={infoIcon}
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
          <AddButton onAdd={onAdd} />
        </div>
        <ul className="flex justify-evenly items-center w-full h-full -ml-[3px] bg-primary rounded-r-full max-w-xs">
          <li className="">
            <ButtonItem
              id={2}
              isActive={active === 2}
              onClick={onClickButton}
              icon={bellIcon}
            />
          </li>
          <li className="">
            <ButtonItem
              id={3}
              isActive={active === 3}
              onClick={onClickButton}
              icon={settingsIcon}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
