import { MouseEvent, useRef, useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import closeIcon from "../assets/close-icon.svg";
// type SearchBoxProps = {
//   places: PlaceInfo[];
//   currentPlace: number;
//   setCurrentPlace: (arg: number) => void;
//   hideSearch: boolean;
//   setHideActionBar: (arg: boolean) => void;
// };

export default function SearchBox({
  objects,
  currentObjectID,
  setCurrentObjectID,
  setHideActionBar,
  hideSearch,
}: SearchBoxProps) {
  const [fromInput, setFromInput] = useState(objects[currentObjectID].address);
  const [isActiveInput, setIsActiveInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);
  const relativeShow = window.isAndroid ? "top-11" : "top-4";

  console.log(objects[currentObjectID].address);

  const onItemClick = (e: MouseEvent) => {
    const address = (e.target as HTMLElement).innerText;
    const objectID = objects.find((i) => i.address.includes(address))!.id;
    setFromInput(address);
    setCurrentObjectID(objectID);
    localStorage.setItem("currentObjectID", objectID.toString());
    setIsActiveInput(false);
    setHideActionBar(false);
  };

  const onClickSearchBox = (e: MouseEvent) => {
    if ((e.target as HTMLLIElement).nodeName != "LI") {
      setIsActiveInput(true);
      setHideActionBar(true);
    }
  };

  const hideOverleyWhenClickOutside = () => {
    setIsActiveInput(false);
    setHideActionBar(false);
    if (fromInput != objects[currentObjectID].address) {
      setFromInput(objects[currentObjectID].address);
    }
  };

  const searchBoxItems = objects
    .filter((i) => i.address.includes(fromInput))
    .map((i) => (
      <li
        className={
          "hover:bg-[#E6FBF3] focus:bg-[#E6FBF3] outline-none active:bg-secondary active:text-white  px-[28px] rounded-full py-[7px] transition-all"
        }
        key={i.id}
        tabIndex={i.id + 3}
        onClick={onItemClick}
      >
        {i.address}
      </li>
    ));

  return (
    <>
      <div
        onClick={hideOverleyWhenClickOutside}
        className={`fixed z-20 transition-all duration-500 ${
          isActiveInput ? " opacity-100 " : " opacity-0 invisible"
        } inset-0  bg-black bg-opacity-50`}
      ></div>
      <div
        onClick={onClickSearchBox}
        className={`absolute z-20 left-1/2 ${
          hideSearch ? "-top-14" : relativeShow
        } -translate-x-1/2 max-w-[400px] w-full px-4 transition-all duration-500`}
      >
        <div
          className={`bg-white   pl-[15px] pr-[20px]  border border-[#E6EDEE] searchbox--shadow ${
            searchBoxItems.length > 0 && isActiveInput
              ? "rounded-2xl"
              : "rounded-full"
          }
                `}
        >
          <div className="flex py-[14px] ">
            <img src={searchIcon} />
            <input
              ref={inputRef}
              value={fromInput}
              tabIndex={1}
              className={`block placeholder:text-[#C1C1C1] font-bold w-full px-[10px] bg-transparent   

          ${
            searchBoxItems.length > 0 ? "text-primary " : "text-red-500 "
          }  outline-none `}
              type="text"
              placeholder="Название объекта"
              onChange={({ target }) => setFromInput(target.value)}
            />
            {fromInput !== "" && (
              <button
                className=" hover:bg-[#E6FBF3] focus:bg-[#E6FBF3] outline-none p-2 rounded-full transition-all"
                tabIndex={2}
                onClick={() => {
                  setFromInput("");
                  inputRef.current.focus();
                }}
              >
                <img className="w-[14px] cursor-pointer" src={closeIcon} />
              </button>
            )}
          </div>
          {isActiveInput && searchBoxItems.length > 0 && (
            <ul className="flex border-t-2 border-[#E6EDEE] flex-col gap-[7px] bg-white text-primary py-[7px] cursor-pointer">
              {searchBoxItems}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
