import { Clusterer, Map, ZoomControl } from "@pbe/react-yandex-maps";
import Mark from "./Mark";
import AddButton from "./AddButton";
import { useState } from "react";

export default function App() {
  const [marks, setMarks] = useState([
    {
      id: 0,
      cords: [59.928194, 30.346644],
    },
  ]);

  function onAdd() {
    const newMark = {
      id: marks[marks.length - 1].id + 1,
      cords: [59.928194 + Math.random(), 30.347644 + Math.random()],
    };

    setMarks((prev) => [...prev, newMark]);
  }

  return (
    <div className="min-h-[100dvh] relative">
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
            preset: "islands#blackClusterIcons",
            groupByCoordinates: false,
          }}
        >
          {marks.map((mark) => (
            <Mark key={mark.id} id={mark.id} cords={mark.cords} />
          ))}
        </Clusterer>
      </Map>
      <AddButton onAdd={onAdd} />
    </div>
  );
}
