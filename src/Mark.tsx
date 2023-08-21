import { Placemark } from "@pbe/react-yandex-maps";
import { MouseEventHandler, useState } from "react";

type MarkType = {
  id: number;
  cords: number[];
};

type MarkInfoType = {
  onClose: MouseEventHandler;
};

function MarkInfo(props: MarkInfoType) {
  return (
    <div onClick={props.onClose} className="absolute inset-0 bg-red-300 z-20">
      <div className="absolute h-[300px] w-[300px]  bg-white top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <button onClick={props.onClose} className="bg-slate-400">
          Close
        </button>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur qui
          perspiciatis illo. Nesciunt laboriosam amet quibusdam architecto
          dicta! Saepe dolor magnam libero, aliquam eum suscipit odio eligendi
          incidunt expedita qui.
        </p>
      </div>
    </div>
  );
}

export default function Mark(props: MarkType) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <Placemark
        onClick={() => setShowInfo(!showInfo)}
        geometry={props.cords}
        options={{
          preset: "islands#blueCircleDotIconWithCaption",
          iconColor: "#000000", // цвет иконки
        }}
        // properties={{
        //   balloonContentHeader: `Балун метки ${props.id}`,
        //   balloonContentBody: "Содержимое <em>балуна</em> метки",
        //   balloonContentFooter: "Подвал",
        //   hintContent: "Хинт метки",
        //   balloonContent: `<div class="my-balloon">
        //   <h4>Наш адрес</h4>
        //   <p class="text-red-500">
        //     Санкт-Петербург,
        //     <br />
        //     Владимирский проспект, 23, лит. А, офис 701
        //   </p>
        //   <a href="#">Схема проезда</a>
        // </div>`,
        // }}
      />
      {showInfo && <MarkInfo onClose={() => setShowInfo(false)} />}
    </>
  );
}
