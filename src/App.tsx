import { YMaps, Map } from '@pbe/react-yandex-maps';
import Mark from './Mark';


export default function App() {

  return (
    <YMaps>
      <section className="map container">
        <Map
          state={{
            center: [59.928194, 30.346644], // координаты центра карты
            zoom: 15,
          }}
          width="100%"
          height={300}
          // включаем модули, отвечающие за всплывающие окна над геообъектами
          modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
        >
          {/* Рисуем метку */}
          <Mark title="test" cords={[59.928194, 30.346644]}/>
          <Mark title="second" cords={[59.928194, 30.346144]}/>
        </Map>
      </section>
    </YMaps>
  );
}