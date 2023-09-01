import { Clusterer, Map, ZoomControl } from "@pbe/react-yandex-maps";
import TreeMark from './TreeMark'
import AddButton from "./AddButton";
import { useEffect, useState } from "react";
import {treesData, furnitureData, placesData} from './data'
import FurnitureMark from "./FurnitureMark";
import SearchBox from "./SearchBox";

declare global {
  interface Window {
      editMark: (id: number) => void;
  }
}

window.editMark = (id: number) => {
  console.log(id);
}

export default function App() {
  const [trees] = useState<TreeInfo[]>(treesData);
  const [furniture] = useState<FurnitureInfo[]>(furnitureData);
  const [places] = useState(placesData);
  const [currentPlace, setCurrentPlace] = useState<number>(0);


  // function onAdd() {
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

  useEffect(() => {
    // document.querySelector("ymaps .ymaps-2-1-79-balloon__content ymaps").style.width="auto"
  }, []);
  return (
    <div className="min-h-screen relative">
      <Map
        state={{
          center: places[currentPlace].cords,
          zoom: 16,
          controls: [],
        }}
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
          {trees.map((item: TreeInfo) => (
            <TreeMark key={item.id} {...item}/>
          ))}
        </Clusterer>

        {/* МАФ */}
        <Clusterer
          options={{
            preset: "islands#darkOrangeClusterIcons",
            groupByCoordinates: false,
          }}
        >
          {furniture.map((item: FurnitureInfo) => (
            <FurnitureMark key={item.id} {...item}/>
          ))}
        </Clusterer>
      </Map>
      <SearchBox places={places} setCurrentPlace={setCurrentPlace}/>
      <AddButton onAdd={null} />
    </div>
  );
}
