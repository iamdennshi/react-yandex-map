import { Placemark } from "@pbe/react-yandex-maps";
import React, { useState } from "react";
import {
  createContentMark,
  createWrapperContent,
  AESTATIC,
  DAMAGE,
  RECOMMENDATION,
  SANITARY,
  AGE,
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
        console.log("GET tree", tempTree);
        return tempTree;
      };

      getTree().then((data: TreeInfo) => {
        const body = `
        <li class="text-primary">Высота: <span data-type="sm" class="font-bold">${
          data.height
        } см</span></li>
        <li class="hidden text-primary">
          <label for="card-item__height">Высота, см:</label>
          <input id="card-item__height" class="card-height" min="1" type="number" value="${
            data.height
          }">
          <p class="hidden text-red-500 text-sm font-bold">⚠ Введите корретную высоту</p>
        </li>
        <li class="text-primary">Диаметр ствола: <span data-type="sm" class="font-bold">${
          data.trunkDiameter
        } см</span></li>
        <li class="hidden text-primary">
          <label for="card-item__trunk-diameter">Диаметр ствола, см:</label>
          <input id="card-item__trunk-diameter" class="card-trunk-diameter" min="1" type="number" value="${
            data.trunkDiameter
          }">
          <p class="hidden text-red-500 text-sm font-bold">⚠ Введите корретный диаметр ствола</p>
        </li>
        <li  class="text-primary">Диапазон возраста: <span data-type="single" class="font-bold">${
          AGE[data.age]
        }</span></li>
        <li class="hidden text-primary">
        <label for="card-item__age">Диапазон возраста:</label>
          <select id="card-item__age" class=" px-2 text-[#58D364] bg-[#DDFFE0] rounded-md w-full focus:bg-secondary focus:text-white outline-none h-[20px] m-0">
            ${AGE.map(
              (i, index) =>
                `<option ${index === data.age && "selected"} value="${i}">${i}</option>`,
            )}
          </select>
      </li>
        <li class="text-primary">Проекция кроны: <span data-type="sm" class="font-bold">${
          data.crownProjection
        } см</span></li>
        <li class="hidden text-primary">
        <label for="card-item__crown-projection">Проекция кроны, см:</label>
        <input id="card-item__crown-projection" class="card-height" min="1" type="number" value="${
          data.crownProjection
        }">
        <p class="hidden text-red-500 text-sm font-bold">⚠ Введите корретную проекцию кроны</p>
      </li>
        <li class="text-primary">Стволов: <span class="font-bold">${data.trunkNumber} шт</span></li>
        <li class="text-primary">Санитарное состояние: <span class="font-bold">${
          SANITARY[data.sanitaryCondition]
        }</span></li>
        <li class="text-primary">Эстетическая оценка: <span class="font-bold">${
          AESTATIC[data.aestaticAssessment]
        }</span></li>
        <li class="text-primary">Повреждения: <span data-type="mult" class="font-bold">${
          data.typeOfDamage.length != 0
            ? data.typeOfDamage.map((elem) => DAMAGE[elem]).join(", ")
            : "Отсутствуют"
        }</span></li>
        <li class="hidden text-primary">
          <lable for="card-item__selector-damages">Повреждения:</label>
          <ul class="flex gap-2 flex-wrap text-green-500">
            <select id="card-item__selector-damages" class=" px-2 text-[#58D364] bg-[#DDFFE0] rounded-md w-full focus:bg-secondary focus:text-white outline-none h-[20px] m-0">
              <option>выбирите повреждение</option>
              ${DAMAGE.map((i) => `<option value="${i}">${i}</option>`)}
            </select>
          </ul>
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
