import { Clusterer, Map, RulerControl, ZoomControl } from "@pbe/react-yandex-maps";
import React, { useCallback, useState } from "react";
import SearchBox from "../SearchBox";
import ActionBar from "../ActionBar";
// import FurnitureMark from "../FurnitureMark.tsx";
import TreeMark from "../TreeMark.tsx";

// Определяем, запущено ли приложение через webview (Android)
try {
  window.isAndroid = Android && true;
} catch {
  window.isAndroid = false;
}

export default function App() {
  const [objects, setObjects] = useState([{ id: 0, cords: [0, 0], address: "Парк" }]);
  const [elements, setElements] = useState({
    trees: [
      {
        id: 0,
        cords: [0.0, 0.0],
        name: "",
      },
    ],
    furnitures: [{ id: 0, cords: [0.0, 0.0], name: "" }],
  });
  const [currentObjectID, setCurrentObjectID] = useState(
    window.isAndroid ? 0 : localStorage.getItem("currentObjectID"),
  );
  const [hideSearch, setHideSearch] = useState(false);
  const [hideActionBar, setHideActionBar] = useState(false);
  const height = window.isAndroid ? "100vh" : "100dvh";
  const [isLoaded, setIsLoaded] = useState(false);

  const hideUI = (type: boolean) => {
    setHideSearch(type);
    setHideActionBar(type);
  };

  const onClickMark = useCallback((id: number, type: boolean) => {
    console.log("onMark ", id);
    hideUI(type);
  }, []);

  React.useEffect(() => {
    async function getObjects() {
      const tempFetchObjects = await fetch("http://192.168.1.100:8000/objects/");
      const tempObjects = await tempFetchObjects.json();
      setObjects(tempObjects);
      setIsLoaded(true);
      console.log(tempObjects);
    }

    getObjects();
  }, []);

  React.useEffect(() => {
    async function getElements() {
      const tempFetchElements = await fetch(
        `http://192.168.1.100:8000/objects/${currentObjectID}/elements`,
      );
      const tempElements = await tempFetchElements.json();
      setElements(tempElements);
      console.log(tempElements);
    }

    getElements();
  }, [currentObjectID]);

  React.useEffect(() => {
    const handle = (deleteElement: CustomEvent) => {
      console.log("handle " + deleteElement.detail.id);

      setElements((prev) => {
        return {
          ...prev,
          trees: prev.trees.filter((element) => element.id != deleteElement.detail.id),
        };
      });
    };

    window.addEventListener("onRemoveMark", handle as EventListener);

    return () => {
      window.removeEventListener("onRemoveMark", handle as EventListener);
    };
  }, []);

  return isLoaded ? (
    <Map
      state={{
        center: objects[currentObjectID].cords,
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
        {elements.trees.map((element) => (
          <TreeMark
            key={element.cords[0] + element.cords[1]}
            id={element.id}
            cords={element.cords}
            currentObjectID={currentObjectID}
            onClickMark={onClickMark}
          />
        ))}
      </Clusterer>

      {/* Элементы благоустройства */}
      {/* <Clusterer
        options={{
          preset: "islands#darkOrangeClusterIcons",
          groupByCoordinates: false,
        }}
      >
        {elements.furnitures.map((item: FurnitureInfo) => (
          <FurnitureMark
            key={item.id}
            placeID={currentObjectID}
            onClickMark={onClickMark}
            info={item}
          />
        ))}
      </Clusterer> */}
      <SearchBox
        objects={objects}
        currentObjectID={currentObjectID}
        setCurrentObjectID={setCurrentObjectID}
        hideSearch={hideSearch}
        setHideActionBar={setHideActionBar}
      />
      <ActionBar
        hideUI={hideUI}
        hideActionBar={hideActionBar}
        currentObjectCords={objects[currentObjectID].cords}
        totalElements={{
          trees: elements.trees.length,
          furnitures: elements.furnitures.length,
        }}
      />
    </Map>
  ) : (
    <div className="loader"></div>
  );
}
