import { ChangeEvent, useEffect, useRef, useState } from "react";
import AddButton from "./AddButton";
import settingsIcon from "../assets/settings-icon.svg";
import bellIcon from "../assets/bell-icon.svg";
import infoIcon from "../assets/info-icon.svg";
import homeIcon from "../assets/home-icon.svg";
import { Placemark } from "@pbe/react-yandex-maps";
import closeIcon from "../assets/close.svg";
import { Info } from "./InfoObject.tsx";

interface ButtonItemProps {
  id: number;
  isActive: boolean;
  onClick: Function;
  icon: string;
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

interface AddModeProps {
  place: PlaceInfo;
  onCloseAdding: Function;
}

interface NewMarkProps {
  onCloseAdding: Function;
}

function NewMark(props: NewMarkProps) {
  const imgRef = useRef(null);
  const newMarkRef = useRef(null);
  console.log("NewMark render");

  const onChangeImage = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.files && imgRef.current && target.files[0]) {
      const img = imgRef.current as HTMLInputElement;
      img.src = URL.createObjectURL(target.files[0]);
    }
  };

  const onFocusTextArea = () => {
    if (window.isAndroid) {
      if (newMarkRef.current != null) {
        const elem = newMarkRef.current as HTMLDivElement;
        elem.style.top = "0px";
      }
    }
  };
  const onLeaveTextArea = () => {
    if (window.isAndroid) {
      if (newMarkRef.current != null) {
        const elem = newMarkRef.current as HTMLDivElement;
        elem.style.top = "";
      }
    }
  };

  return (
    <div
      ref={newMarkRef}
      className="item_border absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 transition-all duration-500 bg-white inset-0 max-h-fit w-[300px] overflow-hidden "
    >
      <div className="absolute right-2 top-3 bg-white rounded-full p-2">
        <img onClick={() => props.onCloseAdding()} src={closeIcon} />
      </div>
      <label className="cursor-pointer" htmlFor="itemImage">
        <img
          ref={imgRef}
          className="h-[260px] w-full object-cover"
          src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        />
      </label>
      <input
        onChange={onChangeImage}
        id="itemImage"
        className="hidden"
        type="file"
        accept="image/*"
      />
      <input
        type="text"
        placeholder="название объекта"
        className="block w-full text-center text-2xl font-bold text-primary my-2 uppercase outline-0"
      />
      <h3 className="w-[61px] mx-auto text-center rounded-md text-[#D39658] bg-[#FFEEDD] text-sm">
        МАФ
      </h3>
      <ul className="flex flex-col px-4 my-4 gap-2 max-h-44 overflow-y-scroll text-sm text-primary">
        <li className="flex">
          <span>Состояние: </span>
          <select className="outline-0 font-bold basis-full">
            <option className="">отличное</option>
            <option>хорошее</option>
            <option>удовлетворительное</option>
          </select>
        </li>
        <li className="">
          <span>Комментарий: </span>
          <textarea
            onFocus={onFocusTextArea}
            onBlur={onLeaveTextArea}
            placeholder="Ваш комментарий ..."
            className="w-full font-bold break-words outline-0"
          />
        </li>
      </ul>
      <button
        type="submit"
        className="block px-4 py-1 m-auto border-solid border-[1px] text-[#D39658] border-[#D39658] rounded mb-2 text-sm"
      >
        Добавить
      </button>
      <div className="text-center text-gray mb-2 text-sm invisible">
        Последнее изменение 02.07.2023 16:37
      </div>
    </div>
  );
}

function AddMode(props: AddModeProps) {
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [showInfo, setShowInfo] = useState(true);
  const [showCoords, setShowCoords] = useState(true);

  useEffect(() => {
    window.ymap.panTo(props.place.cords);
  }, []);
  return (
    <>
      {showCoords ? (
        <Placemark
          instanceRef={(ref) => {
            ref &&
              coordinates[0] == 0 && // To avoid adding extra handlers
              ref.events.add("drag", () => {
                if (showInfo) {
                  setShowInfo(false);
                }
                //@ts-ignore
                setCoordinates(() => ref.geometry._coordinates);
              }) &&
              ref.events.add("click", () => {
                if (showInfo) {
                  setShowInfo(false);
                  setShowCoords(false);
                }
              });
          }}
          geometry={props.place.cords}
          options={{
            preset: "islands#darkOrangeCircleIcon",
            hideIconOnBalloonOpen: false,
            iconOffset: [2, 14],
            draggable: true,
          }}
        />
      ) : (
        <NewMark onCloseAdding={props.onCloseAdding} />
      )}

      {showInfo && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/4 z-10 w-[300px] rounded-2xl bg-white px-6 py-8 ">
          <button
            onClick={() => setShowInfo(false)}
            className="absolute right-4 top-4 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="#B2ABAB"
            >
              <path
                d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99833 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941974 9.35021 0.000986589 9.11607 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z"
                fill="#024751"
                fill-opacity="0.3"
              />
            </svg>
          </button>

          <h3 className="text-center font-bold text-primary">
            Расположите маркер
          </h3>
          <p className="text-center mt-6">
            Кликните по нему чтобы зафиксировать координаты
          </p>
        </div>
      )}
      {showCoords && coordinates[0] != 0 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[250px] bottom-8 text-center  z-10 bg-primary rounded-2xl
        text-white px-4 py-2"
        >
          <p>{coordinates[0]}</p>
          <p>{coordinates[1]}</p>
        </div>
      )}
    </>
  );
}

export default function ActionBar(props: ActionBarProps) {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const [isAddingMode, setIsAddingMode] = useState(false);

  const onClickButton = (id: number) => {
    setActive((prev) => {
      setPrevActive(prev);
      return id;
    });
  };

  const onAdd = () => {
    setIsAddingMode(true);
    props.toggleUI();
  };

  const onCloseAdding = () => {
    setIsAddingMode(false);
    props.toggleUI();
  };

  // Hide Info when click on seachbar
  useEffect(() => {
    setActive(0);
  }, [props.hideActionBar]);

  return (
    <>
      {isAddingMode && (
        <AddMode place={props.place} onCloseAdding={onCloseAdding} />
      )}
      <Info prevActive={prevActive} active={active} place={props.place} />
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
