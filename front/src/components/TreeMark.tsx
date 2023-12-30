import { Placemark } from "@pbe/react-yandex-maps";
import React, { useState } from "react";
import { createContentMark, createWrapperContent } from "../utils";

const AESTATIC = ["отличная", "хорошая", "удовлетворительная", "неудовлетворительная", "аварийное"];

const DAMAGE = [
  "1 дупло",
  "2 дупла",
  "более 2 дупел",
  "морозобоина",
  "несколько морозобоин",
  "сухобочина",
  "трещина",
  "механическое повреждение ствола",
  "отслойка коры",
  "в стволе инородные предметы",
  "усохшие скелетные ветви",
  "наличие капа или сувеля",
  "наличие плодовых тел",
  "ствол наклонен",
  "ствол искривлен",
  "вершина ствола сломана на высоте",
  "развилка ствола на высоте",
  "повреждение корней",
  "обнажение корневых лап",
  "обтаптывание корней",
  "повреждения при прокладке инженерных сетей",
  "повреждение кроны",
  "изменен цвет листвы/хвои",
  "измельчение листьев/хвои",
  "повреждение вредителями",
  "повреждение болезнями",
  "механические повреждения кроны",
];

const SANITARY = [
  "здоровые (без признаков ослабления)",
  "ослабленные",
  "сильно ослабленные",
  "усыхающие",
  "погибшие",
  "свежий сухостой",
  "свежий ветровал",
  "свежий бурелом",
  "старый сухостой",
  "старый ветровал",
  "старый бурелом",
];

const RECOMMENDATION = [
  "рубка с последующей корчевкой прикорневого кома",
  "рубка с дроблением пил",
  "обрезка санитарная кроны до 5 сухих сучьев",
  "обрезка санитарная кроны от 6 до 15 сухих сучьев",
  "обрезка санитарная кроны более 15 сухих сучьев",
  "обрезка вершины",
  "обрезка формовочная кроны слабая",
  "обрезка формовочная кроны средняя",
  "обрезка формовочная кроны сильная",
  "лечение ран ствола и корневых лап размером до 1 дм³",
  "лечение ран ствола и корневых лап размером более 1 до 5 дм³",
  "лечение ран ствола и корневых лап размером более 5 до 10 дм³",
  "лечение ран ствола и корневых лап размером более 10 дм³",
  "лечение и пломбирование дупла размером до 10 дм²",
  "лечение и пломбирование дупла размером более 10 до 30 дм ³",
  "лечение и пломбирование дупла размером более 30 дм³",
  "закраска ран ствола и корневых лап размером до 1 дм²",
  "закраска ран ствола и корневых лап размером от 1 до 5 дм³",
  "закраска ран ствола и корневых лап размером более 5 до 10 дм³",
  "закраска ран ствола и корневых лап размером более 10 дм³",
  "санитарная рубка",
  "рубки ухода",
  "удаление поросли",
  "удаление водяных побегов",
  "удаление плодовых тел",
  "крепление ствола подпорками",
  "стягивание ствола (при развале кроны)",
  "засыпка корней",
  "комплексный уход",
  "обработка химикатами",
];

export function TreeMark(props: MarkProps) {
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
          `http://localhost:8000/objects/${props.currentObjectID}/elements/trees/${props.id}`,
        );
        const tempTree = await tempFetchTree.json();
        console.log(tempTree);
        return tempTree;
      };
      getTree().then((data: TreeInfo) => {
        const body = `
          <li class="text-primary">Высота: <span class="font-bold">${data.height} м</span></li>
        <li class="text-primary">Диаметр ствола: <span class="font-bold">${
          data.trunkDiameter
        } см</span></li>
        <li class="text-primary">Класс возраста: <span class="font-bold">${data.ageClass[0]}-${
          data.ageClass[1]
        } лет</span></li>
        <li class="text-primary">Проекция кроны: <span class="font-bold">${
          data.crownProjection
        }</span></li>
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
}

export default React.memo(TreeMark);
