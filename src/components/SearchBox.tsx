import { MouseEvent, useRef, useState } from "react";

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
        key={i.id}
        tabIndex={i.id}
        onClick={onItemClick}
        className="searchbox-item px-4 py-2  hover:bg-green-50"
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
          hideSearch ? "-top-11" : relativeShow
        } -translate-x-1/2 max-w-xl w-full px-4 transition-all duration-500`}
      >
        <input
          ref={inputRef}
          value={fromInput}
          className={`block w-full px-5 py-2 pl-12  border-solid border-2 
          ${
            searchboxItems.length > 0 && isActiveInput
              ? "rounded-tr-2xl rounded-tl-2xl"
              : "rounded-full"
          }
          ${searchboxItems.length > 0 ? "text-[#4A5568] " : "text-red-500 "} ${
            isActiveInput ? "border-green-500 " : "border-[#ccc] "
          }  outline-none shadow-lg  transition`}
          type="text"
          placeholder="Название объекта"
          onChange={({ target }) => setFromInput(target.value)}
        />
        <div className="absolute top-3 left-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="#4A5568"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        {fromInput !== "" && (
          <div
            onClick={() => {
              setFromInput("");
              inputRef.current.focus();
            }}
            className="close-icon absolute right-8 top-0 hover:opacity-100"
          ></div>
        )}
        {isActiveInput && searchboxItems.length > 0 && (
          <div>
            <ul className="relative  bg-white border-green-500 border-t-0 border-solid border-2 rounded-br-2xl rounded-bl-2xl text-[#4A5568] m-auto cursor-pointer">
              {searchboxItems}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
