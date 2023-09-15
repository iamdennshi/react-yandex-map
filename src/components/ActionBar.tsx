import AddButton from "./AddButton";

function HomeButton() {
  return (
    <div className="cursor-pointer active:scale-90 transition">
      <svg viewBox="0 0 1024 1024" fill="#fff" height="2.5em" width="2.5em">
        <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
      </svg>
    </div>
  );
}

export default function ActionBar(props: ActionBarProps) {
  return (
    <div
      className={`absolute max-w-md h-16 w-full px-4 left-1/2 -translate-x-1/2 flex transition-all duration-500 ${
        props.hideActionBar ? "-bottom-24" : "bottom-8"
      }`}
    >
      <ul className="flex justify-evenly items-center w-full h-full -mr-[3px] bg-green-500 rounded-l-full max-w-xs">
        <li className="">
          <HomeButton />
        </li>{" "}
        <li className="">
          <HomeButton />
        </li>
      </ul>
      <div className="relative bottom-[5px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="87"
          height="69"
          viewBox="0 0 87 55"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 0H0V69H87V0H84C84 22.0914 65.8676 40 43.5 40C21.1324 40 3 22.0914 3 0Z"
            fill="#22c55e"
          />
        </svg>
        <AddButton />
      </div>
      <ul className="flex justify-evenly items-center w-full h-full -ml-[3px] bg-green-500 rounded-r-full max-w-xs">
        <li className="">
          <HomeButton />
        </li>{" "}
        <li className="">
          <HomeButton />
        </li>
      </ul>
    </div>
  );
}
