import { Clusterer, Map, ZoomControl } from "@pbe/react-yandex-maps";
import Mark from "./Mark";
import AddButton from "./AddButton";
import { useEffect, useState } from "react";
import data from './data'

declare global {
  interface Window {
      editMark: (id: number) => void;
  }
}

window.editMark = (id: number) => {
  console.log(id);
}

export default function App() {
  const [marks, setMarks] = useState<MarkType[]>(data);


  function onAdd() {
    const newMark = {
      id: marks[marks.length - 1].id + 1,
      cords: [59.928194 + Math.random(), 30.347644 + Math.random()],
      type: 0,
      name: "",
      height: 0,
      diameter: 0,
      age: 0,
      state: 0,
      comment: "",
    };

    setMarks((prev: MarkType[]) => [...prev, newMark]);
  }   

  useEffect(() => {
    // document.querySelector("ymaps .ymaps-2-1-79-balloon__content ymaps").style.width="auto"
  }, []);

  return (
    <div className="min-h-screen relative">
      <Map
        state={{
          center: marks[marks.length - 1].cords || [59.928194, 30.346644],
          zoom: 8,
          controls: [],
        }}
        width={"100vw"}
        height={"100vh"}
        modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
      >
        <ZoomControl options={{ visible: true }} />

        <Clusterer
          options={{
            preset: "islands#darkGreenClusterIcons",
            groupByCoordinates: false,
          }}
        >
          {marks.map((mark: MarkType) => (
            <Mark key={mark.id} {...mark}/>
          ))}
        </Clusterer>
      </Map>
      <AddButton onAdd={onAdd} />
    </div>
  );
}
