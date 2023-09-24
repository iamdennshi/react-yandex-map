import { Placemark } from "@pbe/react-yandex-maps";
import React from "react";

export function FurnitureMark(props: FurnitureProps) {
  console.log("FurnitureMark render");

  const stringify = JSON.stringify(props.info).replaceAll('"', "'");
  const handleEdit = `window.editMark(${props.placeID}, ${stringify}, 'furniture')`;
  const content = `
  <div class="max-h-[600px] w-[300px]">
  <div class="absolute right-2 top-3 bg-white rounded-full p-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="#B2ABAB">
        <path d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99833 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941974 9.35021 0.000986589 9.11607 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z" fill="#024751" fill-opacity="0.3"/>
    </svg>
  </div>
  <div class="cursor-pointer">
    <img class="h-[260px] w-full object-cover" src="${props.info.img}"/>
  </div>
  <div class="">
    <h2 class="text-center text-2xl font-bold text-primary  my-2 ">${props.info.name.toLocaleUpperCase()}</h2>
    <h3 class="w-[61px] mx-auto text-center rounded-md bg-[#FFEEDD] text-[#D39658]">МАФ</h3>
    <ul class="flex flex-col px-4 my-4 gap-2 max-h-44 overflow-y-scroll ">
      <li class="text-primary">Состояние: <span class="font-bold">удовлетворительное</span></li>
      <li class="text-primary">Комментарий: <span class="font-bold break-words">${
        props.info.comment
      }</span>
    </ul>
    <button onclick="${handleEdit}" class="block px-4 py-1 m-auto border-solid border-[1px] text-[#D39658] border-[#D39658] rounded mb-2">Редактировать</button>
    <div class="text-center text-gray mb-2"">Последнее изменение 02.07.2023 16:37</div>
  </div>
</div>`;

  return (
    <>
      <Placemark
        instanceRef={(ref) => {
          ref &&
            ref.events.add("balloonclose", () =>
              props.onClickMark(props.info.id)
            ) &&
            ref.events.add("balloonopen", () =>
              props.onClickMark(props.info.id)
            );
        }}
        geometry={props.info.cords}
        options={{
          preset: "islands#darkOrangeCircleIcon",
          hideIconOnBalloonOpen: false,
          iconOffset: [2, 14],
        }}
        properties={{
          iconContent: props.info.id,
          balloonContent: content,
        }}
      />
    </>
  );
}

export default React.memo(FurnitureMark);
