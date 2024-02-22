import "./style.css";
import {
  initControlsForDebug,
  initStore,
  initMap,
  initSearch,
  initSubscribers,
} from "./src/inits";

const __DEBUG__ = true;

ymaps.ready(main);

async function main() {
  // Инициализация хранилища текущим ид объекта и списком всех объектов
  await initStore();
  // Инициализируем поиск
  await initSearch();
  // Инициализируем карту и наполняем карту элементами
  await initMap();
  // Проверки сабов и данных в хранилище
  __DEBUG__ && initControlsForDebug();
  // Подписываемся на изменения
  initSubscribers();

  // var newBtn = new ymaps.control.Button({
  //   data: { content: "Добавить полигон" },
  //   options: { maxWidth: 500 },
  // });
  // myMap.controls.add(newBtn, { float: "right" });

  // newBtn.events.add("click", function () {
  //   var myPolygon = new ymaps.Polygon(
  //     [],
  //     {
  //       hintContent: "Hello",
  //     },
  //     {
  //       // Цвет заливки.
  //       fillColor: "#00FF00",
  //       // Цвет обводки.
  //       strokeColor: "#0000FF",
  //       // Ширина обводки.
  //       strokeWidth: 5,
  //     }
  //   );

  //   myPolygon.events.add("click", function (e) {
  //     if (!e.originalEvent.target.editor.state.get("editing")) {
  //       e.originalEvent.target.editor.startEditing();
  //     } else {
  //       e.originalEvent.target.editor.stopEditing();
  //     }
  //   });

  //   // Добавляем многоугольник на карту.
  //   myMap.geoObjects.add(myPolygon);

  //   console.log(myPolygon);

  //   // В режиме добавления новых вершин меняем цвет обводки многоугольника.
  //   var stateMonitor = new ymaps.Monitor(myPolygon.editor.state);
  //   stateMonitor.add("drawing", function (newValue) {
  //     if (!newValue) {
  //       myPolygon.editor.stopDrawing();
  //       myPolygon.editor.stopEditing();
  //     }
  //   });

  //   // Включаем режим редактирования с возможностью добавления новых вершин.
  //   myPolygon.editor.startDrawing();
  // });
}
