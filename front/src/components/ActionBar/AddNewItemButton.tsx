export default function AddNewItemButton(props: AddNewItemButtonProps) {
  return (
    <div className={`absolute z-10 bottom-7  left-[11.5px]`}>
      <button
        tabIndex={props.tabIndex}
        onClick={props.onClick}
        title="Добавить новый объект"
        className={`rounded-full w-16 h-16 flex items-center justify-center bg-secondary text-center text-white cursor-pointer active:scale-90 transition`}
      >
        <svg fill="currentColor" viewBox="0 0 16 16" height="3em" width="3em">
          <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
        </svg>
      </button>
    </div>
  );
}
