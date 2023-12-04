import { Placemark } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";
import NewMark from "./NewMark";

export default function AddingMode(props: AddingModeProps) {
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [showInfo, setShowInfo] = useState(true);
  const [showCoords, setShowCoords] = useState(true);

  useEffect(() => {
    window.ymap.panTo(props.place.cords);
  }, []);
  return (
    <>
      {showCoords ? (
        <Placemark
          instanceRef={(ref) => {
            ref &&
              coordinates[0] == 0 && // To avoid adding extra handlers
              ref.events.add("drag", () => {
                if (showInfo) {
                  setShowInfo(false);
                }
                //@ts-ignore
                setCoordinates(() => ref.geometry._coordinates);
              }) &&
              ref.events.add("click", () => {
                if (showInfo) {
                  setShowInfo(false);
                  setShowCoords(false);
                }
              });
          }}
          geometry={props.place.cords}
          options={{
            preset: "islands#darkOrangeCircleIcon",
            hideIconOnBalloonOpen: false,
            iconOffset: [2, 14],
            draggable: true,
          }}
        />
      ) : (
        <NewMark onCloseAdding={props.onCloseAdding} />
      )}

      {showInfo && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/4 z-10 w-[300px] rounded-2xl bg-white px-6 py-8 ">
          <button
            onClick={() => setShowInfo(false)}
            className="absolute right-4 top-4 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="#B2ABAB"
            >
              <path
                d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99833 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941974 9.35021 0.000986589 9.11607 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z"
                fill="#024751"
                fill-opacity="0.3"
              />
            </svg>
          </button>

          <h3 className="text-center font-bold text-primary">
            Расположите маркер
          </h3>
          <p className="text-center mt-6">
            Кликните по нему чтобы зафиксировать координаты
          </p>
        </div>
      )}
      {showCoords && coordinates[0] != 0 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[250px] bottom-8 text-center  z-10 bg-primary rounded-2xl
        text-white px-4 py-2"
        >
          <p>{coordinates[0]}</p>
          <p>{coordinates[1]}</p>
        </div>
      )}
    </>
  );
}
