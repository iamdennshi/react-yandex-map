import { Placemark } from "@pbe/react-yandex-maps";

export default function FurnitureMark(props: FurnitureProps) {
  const id = props.id;
  const content = `<div class="w-[500px] my-balloon flex">
  <div class="basis-1/2 cursor-pointer mr-4">
    <img class="h-full w-full object-cover " src="${props.img}"/>
  </div>
  <div class="basis-1/2 flex flex-col">
    <h2 class="text-center text-2xl font-bold text-[#4A5568] mb-2 ">${props.name.toLocaleUpperCase()}</h2>
    <h3 class="w-[61px] mx-auto text-center rounded-md bg-[#FFEEDD] text-[#D39658]">МАФ</h3>
    <ul class="flex flex-col my-4 gap-2 max-h-44 overflow-y-scroll ">
      <li class="text-[#4A5568]">Состояние: <span class="font-bold">удовлетворительное</span></li>
      <li class="text-[#4A5568]">Комментарий: <span class="font-bold break-words">${
        props.comment
      }</span>
    </ul>
    <button onclick="window.editMark(${
      props.id
    })" class="block px-4 py-1 m-auto border-solid border-[1px] text-[#D39658] border-[#D39658] rounded mb-2">Редактировать</button>
    <div class="text-center text-[#B2ABAB]">Последнее изменение 02.07.2023 16:37</div>
  </div>
</div>`;

  return (
    <>
      <Placemark
        instanceRef={(ref) =>
          ref &&
          ref.events.add("balloonclose", () => props.onCloseMark(props.id)) &&
          ref.events.add("balloonopen", () => props.onOpenMark(props.id))
        }
        geometry={props.cords}
        options={{
          preset: "islands#darkOrangeCircleIcon",
          hideIconOnBalloonOpen: false,
        }}
        properties={{
          iconContent: props.id,
          balloonContent: content,
        }}
      />
    </>
  );
}
