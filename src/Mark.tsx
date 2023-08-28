import { Placemark } from "@pbe/react-yandex-maps";

export default function Mark(props: MarkType) {

  return (
    <>
      <Placemark
        geometry={props.cords}
        options={{
          preset: "islands#darkGreenCircleIcon",
          hideIconOnBalloonOpen: false,
        }}
        properties={{
          iconContent: props.id,
          //   balloonContentHeader: `Балун метки ${props.id}`,
          //   balloonContentBody: "Содержимое <em>балуна</em> метки",
          //   balloonContentFooter: "Подвал",
          //   hintContent: "Хинт метки",
          // balloonContent: ,

          balloonContent: `<div class="w-[500px] my-balloon flex">
          <div class="basis-1/2 cursor-pointer mr-4">
            <img class="h-full w-full object-cover " src="https://flowertimes.ru/wp-content/uploads/2021/10/buk-derevo.jpg"/>
          </div>
          <div class="basis-1/2">
          <h2 class="text-center text-2xl font-bold text-[#4A5568] mb-2 ">${props.name}</h2>
          <h3 class="bg-[#DDFFE0] text-[#58D364] w-[61px] m-auto text-center rounded-md">дерево</h3>
          <ul class="flex flex-col py-6 gap-3">
            <li class="text-[#4A5568]">Высота: <span class="font-bold">30 м</span></li>
            <li class="text-[#4A5568]">Диаметр: <span class="font-bold">30.5 см</span></li>
            <li class="text-[#4A5568]">Возраст: <span class="font-bold">30 лет</span></li>
            <li class="text-[#4A5568]">Состояние: <span class="font-bold">удовлетворительное</span></li>
            <li class="text-[#4A5568]">Комментарий: <span class="font-bold">Дуб хорошо узнаваем благодаря его плодам, желудям</span>
          </ul>
          <button onclick="window.editMark(${props.id})" class="block px-4 py-1 m-auto border-solid border-[1px] rounded border-[#58D364] text-[#58D364] mb-2">Редактировать</button>
          <div class="text-center text-[#ccc]">Последнее изменение 02.07.2023 16:37</div>
          </div>
        </div>`,
        }}
      />
    </>
  );
}
