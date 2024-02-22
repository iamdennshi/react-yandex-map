import { fetchElements, fetchElement } from "./fetches";
import store from "./store";
import { $ } from "./utils";

export async function updateElements() {
  const currentObjectID = store.get("currentObjectID");
  const elements = await fetchElements(currentObjectID);
  console.log(elements);
  const geoObjects = store.get("map").geoObjects;
  geoObjects.getLength() && geoObjects.removeAll();

  const BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    `<div class="card">
      <div class="card-content">
      {{ properties.type|default:"Loading..." }}
      <br>
      {{ properties.id }}
      <br> 
      <input id="card-input" disabled value="{{ properties.name }}" />
      <br>
      </div>
      <button id="edit-btn">Редактировать</button>
      <button id="remove-btn">Удалить</button>
    <div>`,
    {
      build: function () {
        this.constructor.superclass.build.call(this);
        const editBtn = this.getElement().querySelector("#edit-btn");
        const removeBtn = this.getElement().querySelector("#remove-btn");
        const element = this._data.geoObject;
        const input = $("#card-input");
        let oldData = null;

        // Редактирование элемента
        editBtn.addEventListener("click", () => {
          if (element.options.get("draggable")) {
            const currentObjectID = store.get("currentObjectID");
            const elementID = element.properties.get("id");
            const elementType = element.properties.get("type");
            const newData = { name: input.value };
            input.disabled = true;
            element.options.set("draggable", false);

            console.log(oldData, input.value);
            if (oldData !== input.value) {
              element.properties.set("hintContent", input.value);

              // Update element
              fetch(
                `http://192.168.1.100:8000/objects/${currentObjectID}/elements/${elementType}s/${elementID}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(newData),
                }
              );
            }
          } else {
            oldData = input.value;
            input.disabled = false;
            element.options.set("draggable", true);
          }
        });

        // Удаление элемента
        removeBtn.addEventListener("click", () => {
          geoObjects.remove(element);
        });
      },
    }
  );

  // Добавление деревьев
  for (const element of elements.trees) {
    geoObjects.add(createMark(element, "tree", BalloonContentLayout));
  }

  // Добавление МАФ
  for (const element of elements.furnitures) {
    geoObjects.add(createMark(element, "furniture", BalloonContentLayout));
  }
}

function createMark(element, type, layout) {
  const mark = new ymaps.Placemark(
    element.cords,
    {
      type: type,
      hintContent: element.name,
      iconContent: element.id,
    },
    {
      preset:
        type === "tree"
          ? "islands#darkGreenCircleIcon"
          : "islands#darkOrangeCircleIcon",
      // Заставляем балун открываться даже если в нем нет содержимого.
      openEmptyBalloon: true,
      hideIconOnBalloonOpen: false,
      iconOffset: [2, 14],
      balloonContentLayout: layout,
    }
  );

  mark.events.add("balloonopen", async function () {
    const currentObjectID = store.get("currentObjectID");
    const data = await fetchElement(currentObjectID, element.id, type);
    mark.properties.set("id", data.id);
    mark.properties.set("name", data.name);
  });

  return mark;
}
