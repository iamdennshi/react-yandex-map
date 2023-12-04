import {
  Clusterer,
  Map,
  RulerControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { useCallback, useState } from "react";
import { placesData } from "./data";
import SearchBox from "./components/SearchBox";
import ActionBar from "./components/ActionBar";
import FurnitureMark from "./components/FurnitureMark.tsx";
import TreeMark from "./components/TreeMark.tsx";

declare global {
  interface Window {
    editMark: (
      placeID: number,
      itemInfo: FurnitureInfo | TreeInfo,
      itemType: TypeItem,
    ) => void;
    removeMark: (itemInfo: FurnitureInfo | TreeInfo) => void;

    isAndroid: boolean;
    ymap: ymaps.Map;
  }
}

window.editMark = (
  placeID: number,
  itemInfo: FurnitureInfo | TreeInfo,
  itemType: TypeItem,
) => {
  console.log(itemInfo);
  // Нахождение элемента по ИД быстрее, чем по классу
  const saveBtn = document.getElementById("card-item__save");
  const removeBtn = document.getElementById("card-item__remove");
  const title = document.getElementById("card-item__title");
  if (saveBtn!.innerText == "Редактировать") {
    title?.removeAttribute("disabled");
    removeBtn?.classList.remove("hidden");
    saveBtn!.innerText = "Сохранить" + itemType + placeID;
  } else {
    title?.setAttribute("disabled", "true");
    removeBtn?.classList.add("hidden");

    // Обновляем данные по API
    saveBtn!.innerText = "Редактировать";
  }
};

window.removeMark = (itemInfo: FurnitureInfo | TreeInfo) => {
  console.log(`${itemInfo.id} do remove mark`);
};

// Определяем, запущено ли приложение через webview (Android)
try {
  window.isAndroid = Android && true;
} catch {
  window.isAndroid = false;
}

export default function App() {
  // setPlaces используется только для демонстрации изменения значений элементов
  const [places] = useState(placesData);
  const [currentPlace, setCurrentPlace] = useState(0);
  const [hideSearch, setHideSearch] = useState(false);
  const [hideActionBar, setHideActionBar] = useState(false);
  const height = window.isAndroid ? "100vh" : "100dvh";

  const hideUI = (type: boolean) => {
    setHideSearch(type);
    setHideActionBar(type);
  };

  const onClickMark = useCallback((id: number, type: boolean) => {
    console.log("onMark ", id);
    hideUI(type);
  }, []);

  return (
    <Map
      state={{
        center: places[currentPlace].cords,
        zoom: 20,
        controls: [],
      }}
      options={{
        minZoom: 18,
      }}
      instanceRef={(ref) => (window.ymap = ref)}
      width={"100vw"}
      height={height}
      modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
    >
      <ZoomControl options={{ visible: true }} />
      <RulerControl options={{ position: { left: "50%", bottom: 10 } }} />

      {/* Деревья */}
      <Clusterer
        options={{
          preset: "islands#darkGreenClusterIcons",
          groupByCoordinates: false,
        }}
      >
        {places[currentPlace].trees.map((item: TreeInfo) => (
          <TreeMark
            key={item.id}
            placeID={currentPlace}
            onClickMark={onClickMark}
            info={item}
          />
        ))}
      </Clusterer>

      {/* МАФ */}
      <Clusterer
        options={{
          preset: "islands#darkOrangeClusterIcons",
          groupByCoordinates: false,
        }}
      >
        {places[currentPlace].furniture.map((item: FurnitureInfo) => (
          <FurnitureMark
            key={item.id}
            placeID={currentPlace}
            onClickMark={onClickMark}
            info={item}
          />
        ))}
      </Clusterer>
      <SearchBox
        places={places}
        currentPlace={currentPlace}
        setCurrentPlace={setCurrentPlace}
        hideSearch={hideSearch}
        setHideActionBar={setHideActionBar}
      />
      <ActionBar
        hideUI={hideUI}
        hideActionBar={hideActionBar}
        place={placesData[currentPlace]}
      />
    </Map>
  );
}
