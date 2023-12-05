import { Placemark } from "@pbe/react-yandex-maps";
import React, { useEffect, useState } from "react";
import { createContentMark, createWrapperContent } from "../utils";

export function TreeMark(props: MarkProps) {
  console.log("TreeMark render");
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [content, setContent] = useState(createWrapperContent());

  const onMarkOpen = () => {
    props.onClickMark(props.id, true);
    if (!isContentLoaded) {
      setIsContentLoaded(() => true);
    }
  };

  useEffect(() => {
    if (isContentLoaded) {
      const getTree = async () => {
        const tempFetchTree = await fetch(
          `http://localhost:8000/objects/${props.currentObjectID}/elements/trees/${props.id}`,
        );
        const tempTree = await tempFetchTree.json();
        console.log(tempTree);
        return tempTree;
      };
      getTree().then((data) => {
        const body = `
        <li class="text-primary">Высота: <span class="font-bold">${data.height} м</span></li>
      <li class="text-primary">Диаметр ствола: <span class="font-bold">${data.trunkDiameter} см</span></li>
      <li class="text-primary">Эстетическая оценка: <span class="font-bold">${data.aestaticAssessment}</span></li>
      <li class="text-primary">Комментарий: <span class="font-bold break-words">${data.comment}</span>`;
        setContent(() => createContentMark("tree", body, props.id, data));
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
