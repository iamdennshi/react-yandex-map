import closeIcon from "../../assets/close-icon.svg";
import { ChangeEvent, useRef } from "react";

export default function NewMark(props: NewMarkProps) {
  const imgRef = useRef(null);
  const newMarkRef = useRef(null);
  console.log("NewMark render");

  const onChangeImage = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.files && imgRef.current && target.files[0]) {
      const img = imgRef.current as HTMLInputElement;
      img.src = URL.createObjectURL(target.files[0]);
    }
  };

  const onFocusTextArea = () => {
    if (window.isAndroid) {
      if (newMarkRef.current != null) {
        const elem = newMarkRef.current as HTMLDivElement;
        elem.style.top = "0px";
      }
    }
  };
  const onLeaveTextArea = () => {
    if (window.isAndroid) {
      if (newMarkRef.current != null) {
        const elem = newMarkRef.current as HTMLDivElement;
        elem.style.top = "";
      }
    }
  };

  return (
    <div
      ref={newMarkRef}
      className="item_border absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 transition-all duration-500 bg-white inset-0 max-h-fit w-[300px] overflow-hidden "
    >
      <div className="absolute right-2 top-3 bg-white rounded-full p-2">
        <img onClick={() => props.onCloseAdding()} src={closeIcon} />
      </div>
      <label className="cursor-pointer" htmlFor="itemImage">
        <img
          ref={imgRef}
          className="h-[260px] w-full object-cover"
          src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        />
      </label>
      <input
        onChange={onChangeImage}
        id="itemImage"
        className="hidden"
        type="file"
        accept="image/*"
      />
      <input
        type="text"
        placeholder="название объекта"
        className="block w-full text-center text-2xl font-bold text-primary my-2 uppercase outline-0"
      />
      <h3 className="w-[61px] mx-auto text-center rounded-md text-[#D39658] bg-[#FFEEDD] text-sm">
        МАФ
      </h3>
      <ul className="flex flex-col px-4 my-4 gap-2 max-h-44 overflow-y-scroll text-sm text-primary">
        <li className="flex">
          <span>Состояние: </span>
          <select className="outline-0 font-bold basis-full">
            <option className="">отличное</option>
            <option>хорошее</option>
            <option>удовлетворительное</option>
          </select>
        </li>
        <li className="">
          <span>Комментарий: </span>
          <textarea
            onFocus={onFocusTextArea}
            onBlur={onLeaveTextArea}
            placeholder="Ваш комментарий ..."
            className="w-full font-bold break-words outline-0"
          />
        </li>
      </ul>
      <button
        type="submit"
        className="block px-4 py-1 m-auto border-solid border-[1px] text-[#D39658] border-[#D39658] rounded mb-2 text-sm"
      >
        Добавить
      </button>
      <div className="text-center text-gray mb-2 text-sm invisible">
        Последнее изменение 02.07.2023 16:37
      </div>
    </div>
  );
}
