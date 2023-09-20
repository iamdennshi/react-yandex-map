import { Placemark } from "@pbe/react-yandex-maps";
import React from "react";

export function TreeMark(props: TreeProps) {
  console.log("TreeMark render");

  const content = `
  <div class="w-[300px] max-h-[600px]">
  <div class="cursor-pointer">
    <img class="h-[260px] w-full object-cover" src="${props.info.img}"/>
  </div>
  <div>
    <h2 class="text-center text-2xl font-bold text-[#4A5568]  my-2 ">${props.info.name.toLocaleUpperCase()}</h2>
    <h3 class="w-[61px] mx-auto text-center rounded-md bg-[#DDFFE0] text-[#58D364]">дерево</h3>
    <ul class="flex flex-col px-4 my-4 gap-2 max-h-44 overflow-y-scroll ">
      <li class="text-[#4A5568]">Высота: <span class="font-bold">${
        props.info.height
      } м</span></li>
      <li class="text-[#4A5568]">Диаметр: <span class="font-bold">${
        props.info.diameter
      } см</span></li>
      <li class="text-[#4A5568]">Возраст: <span class="font-bold">${
        props.info.age
      } лет</span></li>
      <li class="text-[#4A5568]">Состояние: <span class="font-bold">удовлетворительное</span></li>
      <li class="text-[#4A5568]">Комментарий: <span class="font-bold break-words">${
        props.info.comment
      } </span>
    </ul>
    <button onclick="window.editMark(${
      props.info.id
    })" class="block px-4 py-1 m-auto border-solid border-[1px] text-[#58D364] border-[#58D364] rounded mb-2">Редактировать</button>
    <div class="text-center text-[#B2ABAB] mb-2">Последнее изменение 02.07.2023 16:37</div>
  </div>
</div>`;

  return (
    <>
      <Placemark
        instanceRef={(ref) =>
          ref &&
          ref.events.add("balloonclose", () =>
            props.onClickMark(props.info.id)
          ) &&
          ref.events.add("balloonopen", () => props.onClickMark(props.info.id))
        }
        geometry={props.info.cords}
        options={{
          preset: "islands#darkGreenCircleIcon",
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

export default React.memo(TreeMark);
