import { Placemark } from "@pbe/react-yandex-maps";
import React, { useEffect, useState } from "react";
import { createContentMark, createWrapperContent } from "../utils";

export function TreeMark(props: TreeMarkProps) {
  console.log("TreeMark render");
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [content, setContent] = useState(createWrapperContent());

  const onMarkOpen = () => {
    props.onClickMark(props.info.id, true);
    if (!isContentLoaded) {
      setIsContentLoaded(() => true);
    }
  };

  useEffect(() => {
    if (isContentLoaded) {
      const fetchData = async () => {
        const data: string = await new Promise((resolve) =>
          setTimeout(
            () => resolve("Updated data " + Math.random().toString()),
            2000,
          ),
        );
        return data;
      };
      fetchData().then((data) => {
        const body = `
        <li class="text-primary">Высота: <span class="font-bold">${
          props.info.height
        } м</span></li>
      <li class="text-primary">Диаметр ствола: <span class="font-bold">${
        props.info.diameter
      } см</span></li>
      <li class="text-primary">Возраст: <span class="font-bold">${
        props.info.age
      } года</span></li>
      <li class="text-primary">Состояние: <span class="font-bold">хорошее</span></li>
      <li class="text-primary">Комментарий: <span class="font-bold break-words">${data.toString()}</span>`;
        setContent(() =>
          createContentMark("tree", body, props.placeID, props.info),
        );
      });
    }
  }, [isContentLoaded]);
  return (
    <>
      <Placemark
        instanceRef={(ref) => {
          ref &&
            !isContentLoaded && // To avoid adding extra handlers
            ref.events.add("balloonclose", () => {
              props.onClickMark(props.info.id, false);
            }) &&
            ref.events.add("balloonopen", onMarkOpen);
        }}
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
