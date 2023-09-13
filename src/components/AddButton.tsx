export default function AddButton(props: AddButtonType) {
  return (
    <div
      className={`absolute z-10 bottom-8 transition-all duration-500 ${
        props.hideAddButton ? "-right-16" : "right-8"
      }`}
    >
      <button
        onClick={() => Android.showToast("Add button")}
        title="Добавить новый объект"
        className={`rounded-full w-16 h-16 pl-2 ${
          window.isAndroid ? "bg-green-500" : "bg-red-500"
        } text-center text-white cursor-pointer active:translate-y-1 transition`}
      >
        <svg fill="currentColor" viewBox="0 0 16 16" height="3em" width="3em">
          <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
        </svg>
      </button>
    </div>
  );
}
