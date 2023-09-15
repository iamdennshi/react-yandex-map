import AddButton from "./AddButton";

export default function ActionBar(props: ActionBarProps) {
  return (
    <div
      className={`absolute max-w-md h-16 w-full px-4 left-1/2 -translate-x-1/2 flex transition-all duration-500 ${
        props.hideActionBar ? "-bottom-24" : "bottom-8"
      }`}
    >
      <ul className="block w-full h-full -mr-[3px] bg-green-500 rounded-l-full max-w-xs">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
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
      <ul className="block w-full h-full -ml-[3px] bg-green-500 rounded-r-full max-w-xs"></ul>
    </div>
  );
}
