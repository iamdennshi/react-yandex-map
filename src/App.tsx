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
    isAndroid: boolean;
    ymap: ymaps.Map;
  }
}

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
  const height = window.isAndroid ? "100vh" : "100dvh";
  const switchUI = (type: boolean) => {
    setHideSearch(() => type);
    setHideActionBar(() => type);
  };
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

  const onClickMark = useCallback((id: number, type: boolean) => {
    console.log("onMark ", id);
    switchUI(type);
  }, []);

  return (
    <div className="relative overflow-hidden">
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
          switchUI={switchUI}
          hideActionBar={hideActionBar}
          place={placesData[currentPlace]}
        />
      </Map>
    </div>
  );
}
