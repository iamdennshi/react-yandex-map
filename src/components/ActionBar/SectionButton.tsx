export default function SectionButton(props: SectionButtonProps) {
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
