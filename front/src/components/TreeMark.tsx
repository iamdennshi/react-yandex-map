import { Placemark } from "@pbe/react-yandex-maps";
import React, { useState } from "react";
import {
  createContentMark,
  createWrapperContent,
  AESTATIC,
  DAMAGE,
  RECOMMENDATION,
  SANITARY,
} from "../utils";

export const TreeMark = React.memo((props: MarkProps) => {
  console.log("TreeMark render");
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [content, setContent] = useState(createWrapperContent());

  const onMarkOpen = () => {
    props.onClickMark(props.id, true);
    if (!isContentLoaded) {
      setIsContentLoaded(() => true);

      setContent(createWrapperContent());
      const getTree = async () => {
        const tempFetchTree = await fetch(
          `http://192.168.1.100:8000/objects/${props.currentObjectID}/elements/trees/${props.id}`,
        );
        const tempTree = await tempFetchTree.json();
        console.log(tempTree);
        return tempTree;
      };

      getTree().then((data: TreeInfo) => {
        const body = `
        <li class="text-primary">Высота: <span class="font-bold">${data.height} см</span></li>
        <li class="hidden text-primary">
          <label for="card-item__height">Высота, см:</label>
          <input id="card-item__height" class="card-height" min="1" type="number" value="${
            data.height
          }">
          <p class="hidden text-red-500 text-sm font-bold">⚠ Введите корретную высоту</p>
        </li>
        <li class="text-primary">Диаметр ствола: <span class="font-bold">${
          data.trunkDiameter
        } см</span></li>
        <li class="hidden text-primary">
          <label for="card-item__trunk-diameter">Диаметр ствола, см:</label>
          <input id="card-item__trunk-diameter" class="card-trunk-diameter" min="1" type="number" value="${
            data.trunkDiameter
          }">
          <p class="hidden text-red-500 text-sm font-bold">⚠ Введите корретный диаметр ствола</p>
        </li>
        <li class="text-primary">Класс возраста: <span class="font-bold">${data.ageClass[0]}-${
          data.ageClass[1]
        } лет</span></li>
        <li class="text-primary">Проекция кроны: <span class="font-bold">${
          data.crownProjection
        } см</span></li>
        <li class="text-primary">Стволов: <span class="font-bold">${data.trunkNumber} шт</span></li>
        <li class="text-primary">Санитарное состояние: <span class="font-bold">${
          SANITARY[data.sanitaryCondition]
        }</span></li>
        <li class="text-primary">Эстетическая оценка: <span class="font-bold">${
          AESTATIC[data.aestaticAssessment]
        }</span></li>
        <li class="text-primary">Повреждения: <span class="font-bold">${data.typeOfDamage.map(
          (elem) => DAMAGE[elem],
        )}</span></li>
        <li class="hidden text-primary">
          <p>Повреждения:</p>
          <ul class="flex gap-2 flex-wrap text-green-500">
            <li class="flex">
              <p class="bg-white px-2 border-l border-y border-green-500 rounded-l">test</p>
              <button class="bg-white px-2 border-r border-y border-green-500 rounded-r">x</button>
            </li>
            <select id="card-item__select-damage" class="bg-white px-2 border border-green-500 rounded w-28">
              <option>выбирите повреждение</option>
              ${DAMAGE.map((i) => `<option value="${i}">${i}</option>`)}
            </select>
          </ul>
          <p class="hidden text-red-500 text-sm font-bold">⚠ Введите корретный диаметр ствола</p>
        </li>
        <li class="text-primary">Рекомендации по уходу: <span class="font-bold">${data.recommendation.map(
          (elem) => RECOMMENDATION[elem],
        )}</span></li>
        <li class="text-primary">Примечание: <span class="font-bold break-words">${
          data.comment
        }</span>`;
        setContent(() => createContentMark("tree", body, props.currentObjectID, data));
      });
    }
  };

  return (
    <>
      <Placemark
        instanceRef={(ref) => {
          ref &&
            !isContentLoaded && // To avoid adding extra handlers
            ref.events.add("balloonclose", () => {
              props.onClickMark(props.id, false);
            }) &&
            ref.events.add("balloonopen", onMarkOpen);
        }}
        geometry={props.cords}
        options={{
          preset: "islands#darkGreenCircleIcon",
          hideIconOnBalloonOpen: false,
          iconOffset: [2, 14],
        }}
        properties={{
          iconContent: props.id,
          balloonContent: content,
        }}
      />
    </>
  );
});

export default TreeMark;
