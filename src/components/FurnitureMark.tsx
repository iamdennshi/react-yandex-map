import { Placemark } from "@pbe/react-yandex-maps";
import React from "react";
import { createContentMark } from "../utils";

export function FurnitureMark(props: FurnitureProps) {
  console.log("FurnitureMark render");

  const body = `
    <li class="text-primary">Состояние: <span class="font-bold">удовлетворительное</span></li>
    <li class="text-primary">Комментарий: <span class="font-bold break-words">${props.info.comment}</span>
  `;
  const content = createContentMark(
    "furniture",
    body,
    props.placeID,
    props.info,
  );

  return (
    <>
      <Placemark
        instanceRef={(ref) => {
          ref &&
            ref.events.add("balloonclose", () =>
              props.onClickMark(props.info.id, false),
            ) &&
            ref.events.add("balloonopen", () =>
              props.onClickMark(props.info.id, true),
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
