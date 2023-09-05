import { Clusterer, Map, ZoomControl } from "@pbe/react-yandex-maps";
import TreeMark from "./components/TreeMark";
import AddButton from "./components/AddButton";
import { useRef, useState } from "react";
import { placesData } from "./data";
import FurnitureMark from "./components/FurnitureMark";
import SearchBox from "./components/SearchBox";
import ymaps from "yandex-maps";

declare global {
  interface Window {
    editMark: (id: number) => void;
  }
}

window.editMark = (id: number) => {
  console.log(id);
};

export default function App() {
  const [places] = useState(placesData);
  const [currentPlace, setCurrentPlace] = useState<number>(0);
  const mapRef = useRef<ymaps.Map>(null);

  function onAdd() {
    // mapRef.current.panTo([58.010829, 56.253604]);
  }

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

  function onOpenMark(id: number) {
    console.log("open ", id);
  }

  function onCloseMark(id: number) {
    console.log("close ", id);
  }

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
        instanceRef={mapRef}
        // instanceRef={(ref) => ref && setMapRef(ref)}
        width={"100vw"}
        height={"100vh"}
        modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
      >
        <ZoomControl options={{ visible: true }} />

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
              onOpenMark={onOpenMark}
              onCloseMark={onCloseMark}
              {...item}
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
              onOpenMark={onOpenMark}
              onCloseMark={onCloseMark}
              {...item}
            />
          ))}
        </Clusterer>
      </Map>
      <SearchBox
        places={places}
        currentPlace={currentPlace}
        setCurrentPlace={setCurrentPlace}
      />
      <AddButton onAdd={onAdd} />
    </div>
  );
}
