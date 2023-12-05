import { useEffect, useState } from "react";
import AddNewItemButton from "./AddNewItemButton.tsx";
import settingsIcon from "../../assets/settings-icon.svg";
import bellIcon from "../../assets/bell-icon.svg";
import infoIcon from "../../assets/info-icon.svg";
import homeIcon from "../../assets/home-icon.svg";
import Section from "./Section";
import AddingMode from "./AddingMode.tsx";
import SectionButton from "./SectionButton.tsx";

export default function ActionBar(props: ActionBarProps) {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const [isAddingMode, setIsAddingMode] = useState(false);

  const onClickSectionButton = (id: number) => {
    setActive((prev) => {
      setPrevActive(prev);
      return id;
    });
  };

  const onAddNewItem = () => {
    setIsAddingMode(true);
    props.hideUI(true);
  };

  const onCloseAdding = () => {
    setIsAddingMode(false);
    props.hideUI(false);
  };

  // Swtich to 0 section when click on SearchBox
  useEffect(() => {
    setActive(0);
  }, [props.hideActionBar]);

  return (
    <>
      {isAddingMode && (
        <AddingMode
          currentObjectCords={props.currentObjectCords}
          onCloseAdding={onCloseAdding}
        />
      )}
      <Section
        prevActive={prevActive}
        active={active}
        totalElements={props.totalElements}
      />
      <div
        className={`absolute z-10 max-w-sm h-[66px] w-full px-4 left-1/2 -translate-x-1/2 flex transition-all duration-500 ${
          props.hideActionBar ? "-bottom-24" : "bottom-8"
        }`}
      >
        <ul className="flex justify-around items-center w-full h-full -mr-[3px] bg-primary rounded-l-full max-w-xs">
          <li className="">
            <SectionButton
              id={0}
              isActive={active === 0}
              onClick={onClickSectionButton}
              icon={homeIcon}
              tabIndex={props.hideActionBar ? -1 : 0}
            />
          </li>
          <li className="">
            <SectionButton
              id={1}
              isActive={active === 1}
              onClick={onClickSectionButton}
              icon={infoIcon}
              tabIndex={props.hideActionBar ? -1 : 0}
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
          <AddNewItemButton
            onClick={onAddNewItem}
            tabIndex={props.hideActionBar ? -1 : 0}
          />
        </div>
        <ul className="flex justify-evenly items-center w-full h-full -ml-[3px] bg-primary rounded-r-full max-w-xs">
          <li className="">
            <SectionButton
              id={2}
              isActive={active === 2}
              onClick={onClickSectionButton}
              icon={bellIcon}
              tabIndex={props.hideActionBar ? -1 : 0}
            />
          </li>
          <li className="">
            <SectionButton
              id={3}
              isActive={active === 3}
              onClick={onClickSectionButton}
              icon={settingsIcon}
              tabIndex={props.hideActionBar ? -1 : 0}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
