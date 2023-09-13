import { MouseEvent, useRef, useState } from "react";

type Searchbox = {
  places: PlaceInfo[];
  currentPlace: number;
  setCurrentPlace: Function;
  hideSearch: boolean;
  setHideAddButton: Function;
};

const relativeShow = window.isAndroid ? "top-11" : "top-4";

export default function SearchBox({
  places,
  currentPlace,
  setCurrentPlace,
  hideSearch,
  setHideAddButton,
}: Searchbox) {
  console.log("serach");

  const [fromInput, setFromInput] = useState(places[currentPlace].address);
  const inputRef = useRef<HTMLInputElement>(null!);
  const [isActiveInput, setIsActiveInput] = useState(false);

  const onItemClick = (e: MouseEvent) => {
    const address = (e.target as HTMLElement).innerText;
    setFromInput(address);
    setCurrentPlace(places.find((i) => i.address.includes(address))?.id);
    setIsActiveInput(false);
    setHideAddButton(false);
  };

  const onClickSearchbox = (e: MouseEvent) => {
    if ((e.target as HTMLLIElement).nodeName != "LI") {
      setIsActiveInput(true);
      setHideAddButton(true);
    }
  };

  const hideOverleyWhenClickOutside = () => {
    setIsActiveInput(false);
    setHideAddButton(false);
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
        } -translate-x-2/4 max-w-xl w-full px-4 transition-all duration-500`}
      >
        <input
          ref={inputRef}
          value={fromInput}
          className={`block w-full px-5 py-2 pl-12 rounded-full border-solid border-2 ${
            isActiveInput ? "border-green-500" : "border-[#ccc]"
          }  outline-none shadow-lg   ${
            searchboxItems.length > 0 ? "text-[#4A5568]" : "text-red-500"
          }  font-medium transition`}
          type="text"
          placeholder="Название объекта"
          onChange={({ target }) => setFromInput(target.value)}
        />
        <div className="absolute top-2 left-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
          <div className="px-4">
            <ul className="relative -top-[2.6px] bg-white border-green-500 border-t-0 border-solid border-2 rounded-br-2xl rounded-bl-2xl text-[#4A5568] max-w-lg m-auto cursor-pointer">
              {searchboxItems}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
