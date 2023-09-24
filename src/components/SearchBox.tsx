import { MouseEvent, useRef, useState } from "react";
import searchIcon from '../assets/search-icon.svg'
import closeIcon from '../assets/close.svg'
type Searchbox = {
  places: PlaceInfo[];
  currentPlace: number;
  setCurrentPlace: Function;
  hideSearch: boolean;
  setHideActionBar: Function;
};

export default function SearchBox({
  places,
  currentPlace,
  setCurrentPlace,
  hideSearch,
  setHideActionBar,
}: Searchbox) {
  const [fromInput, setFromInput] = useState(places[currentPlace].address);
  const inputRef = useRef<HTMLInputElement>(null!);
  const [isActiveInput, setIsActiveInput] = useState(false);

  const relativeShow = window.isAndroid ? "top-11" : "top-4";

  const onItemClick = (e: MouseEvent) => {
    const address = (e.target as HTMLElement).innerText;
    setFromInput(address);
    setCurrentPlace(places.find((i) => i.address.includes(address))?.id);
    setIsActiveInput(false);
    setHideActionBar(false);
  };

  const onClickSearchbox = (e: MouseEvent) => {
    if ((e.target as HTMLLIElement).nodeName != "LI") {
      setIsActiveInput(true);
      setHideActionBar(true);
    }
  };

  const hideOverleyWhenClickOutside = () => {
    setIsActiveInput(false);
    setHideActionBar(false);
    if (fromInput != places[currentPlace].address) {
      setFromInput(places[currentPlace].address);
    }
  };

  const searchboxItems = places
    .filter((i) => i.address.includes(fromInput))
    .map((i) => (
      <li
          className={"active:bg-[#E6FBF3]  px-[28px] rounded-full py-[7px] transition-all"}
        key={i.id}
        tabIndex={i.id}
        onClick={onItemClick}
      >
        {i.address}
      </li>
    ));

  return (
    <>
      <div
        onClick={hideOverleyWhenClickOutside}
        className={`fixed transition-all duration-500 ${
          isActiveInput ? " opacity-100 " : " opacity-0 invisible"
        } inset-0  bg-black bg-opacity-50`}
      ></div>
      <div
        onClick={onClickSearchbox}
        className={`absolute z-20 left-1/2 ${
          hideSearch ? "-top-14" : relativeShow
        } -translate-x-1/2 max-w-[400px] w-full px-4 transition-all duration-500`}
      >
        <div className={`bg-white   pl-[15px] pr-[20px]  border border-[#E6EDEE] searchbox--shadow ${searchboxItems.length > 0 && isActiveInput
                        ? "rounded-2xl"
                        : "rounded-full"}
                ` }>
          <div className='flex py-[14px] '>
            <img src={searchIcon} />
            <input
                ref={inputRef}
                value={fromInput}
                className={`block placeholder:text-[#C1C1C1] font-bold w-full px-[10px] bg-transparent   

          ${searchboxItems.length > 0 ? "text-primary " : "text-red-500 "}  outline-none `}
                type="text"
                placeholder="Название объекта"
                onChange={({ target }) => setFromInput(target.value)}
            />
            {fromInput !== "" && (
                <img className='w-[14px]'  src={closeIcon}
                     onClick={() => {
                       setFromInput("");
                       inputRef.current.focus();
                     }}
                />
            )}
          </div>
          {isActiveInput && searchboxItems.length > 0 && (
            <ul className="flex border-t-2 border-[#E6EDEE] flex-col gap-[7px] bg-white text-primary py-[7px] cursor-pointer">
              {searchboxItems}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
