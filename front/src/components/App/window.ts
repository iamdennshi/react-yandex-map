import "./types.d";

window.makeEditMark = () => {
  let lastElementID = -1;
  let lastData = {};

  // В режиме редактирования
  // FIXME: Срабатывает в хар-ки повреждения, удаляя button
  const onInput = (event: Event) => {
    const elem = event.currentTarget as HTMLInputElement;
    elem.nextElementSibling?.classList.add("hidden");
    console.log("onInput");
  };

  // При выборе повреждения
  const onSelect = (event: Event) => {
    const elem = event.currentTarget as HTMLSelectElement;

    console.log("onSelect");
  };

  return function (objectID: number, element: TreeInfo) {
    // Нахождение элемента по ИД быстрее, чем по классу
    const saveBtn = document.getElementById("card-item__save") as HTMLButtonElement;
    const removeBtn = document.getElementById("card-item__remove") as HTMLButtonElement;
    const title = document.getElementById("card-item__title") as HTMLInputElement;
    const height = document.getElementById("card-item__height") as HTMLInputElement;
    const trunkDiameter = document.getElementById("card-item__trunk-diameter") as HTMLInputElement;
    const bodyUlElement = document.getElementById("card-item__body") as HTMLInputElement;
    const selectDamage = document.getElementById("card-item__select-damage") as HTMLSelectElement;

    selectDamage.addEventListener("input", onSelect);

    // При нажатии на Редактировать
    if (saveBtn.innerText == "Редактировать") {
      if (bodyUlElement) {
        const liElements = bodyUlElement.querySelectorAll(":scope > li");

        // Добавление обработчиков (можно только добавлять когда первый раз показываем элемент)
        liElements.forEach((liElement) => {
          if (!liElement.classList.toggle("hidden")) {
            const inputElement = liElement.querySelector("input");
            if (inputElement) {
              inputElement.addEventListener("click", onInput);
              console.log("add event");
            }
          }
        });
      }
      title.addEventListener("click", onInput);

      title.removeAttribute("disabled");

      removeBtn.classList.remove("hidden");
      saveBtn.innerText = "Сохранить";

      if (lastElementID != element.id) {
        lastElementID = element.id;

        lastData = {
          name: element.name,
          height: element.height,
          trunkDiameter: element.trunkDiameter,
        };
      }
    } else {
      // При нажатии на Сохранить
      let isError = false;

      if (bodyUlElement) {
        const liElements = bodyUlElement.querySelectorAll(":scope > li");
        let prevElement: HTMLSpanElement | null = null;

        // Проверка корректности введенного title
        // Если введена пуста строка
        // или при попытки преобразования к числу не получили NaN (т.е в value не записаны числа)
        if (title.value == "" || !isNaN(Number(title.value))) {
          isError = true;
          title.nextElementSibling?.classList.remove("hidden");
          console.log("title.value ", title.value);
        }

        // Проверка корректности введенных значений характеристик
        liElements.forEach((liElement) => {
          if (!liElement.classList.contains("hidden")) {
            // Проверка выстоты
            const val = Number(liElement.querySelector("input")!.value);
            if (val <= 0) {
              liElement.querySelector("p")?.classList.remove("hidden");
              console.log("error 1");
              isError = true;
            } else {
              if (prevElement) {
                prevElement.innerText = `${val} см`;
              }
            }
          } else {
            prevElement = liElement.querySelector("span");
          }
        });
      }
      if (!isError) {
        if (bodyUlElement) {
          const liElements = bodyUlElement.querySelectorAll(":scope > li");

          // Удаление обработчиков
          liElements.forEach((liElement) => {
            if (liElement.classList.toggle("hidden")) {
              const inputElement = liElement.querySelector("input");
              if (inputElement) {
                inputElement.removeEventListener("click", onInput);
                console.log("remove event ");
              }
            }
          });
        }
        title.removeEventListener("click", onInput);

        console.log("not error");
        title.setAttribute("disabled", "true");

        removeBtn.classList.add("hidden");
        title.nextElementSibling?.classList.add("hidden");

        saveBtn.innerText = "Редактировать";

        const newData = {
          name: title.value,
          height: Number(height.value),
          trunkDiameter: Number(trunkDiameter.value),
        };

        if (JSON.stringify(lastData) != JSON.stringify(newData)) {
          console.log("UPDATE DATA ", newData);
          lastData = newData;

          fetch(`http://192.168.1.100:8000/objects/${objectID}/elements/trees/${element.id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newData),
          });
        }
      }
    }
  };
};

window.editMark = window.makeEditMark();

window.removeMark = (objectID: number, element: TreeInfo | FurnitureInfo) => {
  console.log(`${element.id} do remove mark`);

  window.dispatchEvent(
    new CustomEvent("onRemoveMark", {
      detail: { id: element.id },
    }),
  );

  // fetch(`http://192.168.1.100:8000/objects/${objectID}/elements/trees/${element.id}`, {
  //   method: "DELETE",
  // });
};
