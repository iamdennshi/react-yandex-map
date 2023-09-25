import {
    Clusterer,
    Map, Placemark,
    RulerControl,
    ZoomControl,
} from "@pbe/react-yandex-maps";
import TreeMark from "./components/TreeMark";
import React, { useCallback, useState } from "react";
import { placesData } from "./data";
import FurnitureMark from "./components/FurnitureMark";
import SearchBox from "./components/SearchBox";
import ActionBar from "./components/ActionBar";

declare global {
  interface Window {
    editMark: (
      placeID: number,
      infoItemStringify: string,
      itemType: TypeItem
    ) => void;
    isAndroid: boolean;
  }
}

window.editMark = (
  placeID: number,
  infoItemStringify: string,
  itemType: TypeItem
) => {
  console.log(placeID);
  console.log(infoItemStringify);
  console.log(itemType);
};

// Определяем, запущено ли приложение через webview (Android)
try {
  window.isAndroid = Android && true;
} catch {
  window.isAndroid = false;
}

export default function App() {
  const [places] = useState(placesData);
  const [currentPlace, setCurrentPlace] = useState<number>(0);
  // const mapRef = useRef<ymaps.Map>(null);
  const [hideSearch, setHideSearch] = useState(false);
  const [hideActionBar, setHideActionBar] = useState(false);
  const toggleUI = () => {
        setHideSearch((prev) => !prev);
        setHideActionBar((prev) => !prev);
  }
  // function onAdd() {
  // mapRef.current.panTo([58.010829, 56.253604]);

  //   const newMark = {
  //     id: marks[marks.length - 1].id + 1,
  //     cords: [59.928194 + Math.random(), 30.347644 + Math.random()],
  //     type: 0,
  //     name: "Дубяра",
  //     info: {
  //       height: 0,
  //       diameter: 0,
  //       age: 0,
  //       state: 0,
  //       comment: "",
  //     }
  //   };

  //   setMarks((prev: MarkInfo[]) => [...prev, newMark]);
  // }

  const onClickMark = useCallback((id: number) => {
    console.log("onMark ", id);
      toggleUI()
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Map
        state={{
          center: places[currentPlace].cords,
          zoom: 20,
          controls: [],
        }}
        options={{
          minZoom: 18,
        }}
        // instanceRef={mapRef}
        // instanceRef={(ref) => ref && setMapRef(ref)}
        width={"100vw"}
        height={"100vh"}
        modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
      >
        <ZoomControl options={{ visible: true }} />
        <RulerControl options={{ position: { left: "50%", bottom: 10 } }} />

        {/* Деревья */}
        {/*<Clusterer*/}
        {/*  options={{*/}
        {/*    preset: "islands#darkGreenClusterIcons",*/}
        {/*    groupByCoordinates: false,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {places[currentPlace].trees.map((item: TreeInfo) => (*/}
        {/*    <TreeMark*/}
        {/*      key={item.id}*/}
        {/*      placeID={currentPlace}*/}
        {/*      onClickMark={onClickMark}*/}
        {/*      info={item}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</Clusterer>*/}

        {/* МАФ */}
        {/*<Clusterer*/}
        {/*  options={{*/}
        {/*    preset: "islands#darkOrangeClusterIcons",*/}
        {/*    groupByCoordinates: false,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {places[currentPlace].furniture.map((item: FurnitureInfo) => (*/}
        {/*    <FurnitureMark*/}
        {/*      key={item.id}*/}
        {/*      placeID={currentPlace}*/}
        {/*      onClickMark={onClickMark}*/}
        {/*      info={item}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</Clusterer>*/}
          <SearchBox
              places={places}
              currentPlace={currentPlace}
              setCurrentPlace={setCurrentPlace}
              hideSearch={hideSearch}
              setHideActionBar={setHideActionBar}
          />
          <ActionBar toggleUI={toggleUI}  hideActionBar={hideActionBar} place={placesData[currentPlace]} />
      </Map>
    </div>
  );
}
