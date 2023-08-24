import { Clusterer, Map, ZoomControl } from "@pbe/react-yandex-maps";
import Mark from "./Mark";
import AddButton from "./AddButton";
import { useEffect, useState } from "react";
import { YMapsApi } from "@pbe/react-yandex-maps/typings/util/typing";

export default function App() {
  const [ymaps, setYmaps] = useState<YMapsApi>();
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

  useEffect(() => {
    // document.querySelector("ymaps .ymaps-2-1-79-balloon__content ymaps").style.width="auto"
  }, []);

  return (
    <div className="min-h-[100dvh] relative">
      <Map
        state={{
          center: marks[marks.length - 1].cords || [59.928194, 30.346644],
          zoom: 8,
          controls: [],
        }}
        onLoad={(ymaps) => setYmaps(ymaps)}
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
          {marks.map((mark) => (
            <Mark key={mark.id} id={mark.id} cords={mark.cords} />
          ))}
        </Clusterer>
      </Map>
      <AddButton onAdd={onAdd} />
    </div>
  );
}
