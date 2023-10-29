import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { YMaps } from "@pbe/react-yandex-maps";

function render() {
  root.render(
    <React.StrictMode>
      <YMaps query={{ apikey: import.meta.env.VITE_API_KEY }}>
        <App />
      </YMaps>
    </React.StrictMode>,
  );
}

window.editMark = (
  placeID: number,
  itemInfo: FurnitureInfo | TreeInfo,
  itemType: TypeItem,
) => {
  const cardButton = document.getElementById("card-item__button");
  if (cardButton!.innerText == "Редактировать") {
    const oldTitle = document.getElementById("card-item__title");
    const newTitle = document.createElement("input");
    const parentTitle = oldTitle?.parentNode;

    newTitle.setAttribute("type", "text");
    newTitle.setAttribute("placeholder", itemInfo.name);
    newTitle.className = "card-title";
    parentTitle?.replaceChild(newTitle, oldTitle as Node);

    cardButton!.innerText = "Сохранить" + itemType + placeID;
  } else {
    cardButton!.innerText = "Редактировать";
  }
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
render();
