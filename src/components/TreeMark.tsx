import { Placemark } from "@pbe/react-yandex-maps";
import React from "react";
import {createContentMark} from "../utils";

export function TreeMark(props: TreeProps) {
  console.log("TreeMark render");

  const body = `
        <li class="text-primary">Высота: <span class="font-bold">${
      props.info.height
  } м</span></li>
      <li class="text-primary">Диаметр: <span class="font-bold">${
      props.info.diameter
  } см</span></li>
      <li class="text-primary">Возраст: <span class="font-bold">${
      props.info.age
  } лет</span></li>
      <li class="text-primary">Состояние: <span class="font-bold">удовлетворительное</span></li>
      <li class="text-primary">Комментарий: <span class="font-bold break-words">${
      props.info.comment
  } </span>`
  const content = createContentMark('tree', body, props.placeID, props.info,  )

  return (
    <>
      <Placemark
        instanceRef={(ref) =>
          ref &&
          ref.events.add("balloonclose", () => {
                props.onClickMark(props.info.id)
          }

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
