import "./types.d";

window.makeEditMark = () => {
  let lastElementID = -1;
  let lastData = {};
  // id - номер option в select (для удаления)
  let selectedDamages: { id: number; value: string }[] = [];

  // В режиме редактирования
  // FIXME: Срабатывает в хар-ки повреждения, удаляя button
  const onInput = (event: Event) => {
    const elem = event.currentTarget as HTMLInputElement;
    elem.nextElementSibling?.classList.add("hidden");
    console.log("onInput");
  };

  // При удалении повреждения
  const handleDeleteDamage = (event: Event) => {
    const elem = event.currentTarget as HTMLSelectElement;
    const target = event.target as HTMLElement;

    if (target.nodeName === "BUTTON") {
      const pElem = elem.firstChild as HTMLParagraphElement;

      // Получаем удаляемый объект
      const selectedObj = selectedDamages.find((obj) => obj.value == pElem.innerText);
      if (selectedObj) {
        // Удаляем из selectedDamages
        console.log("Удаляем из selectedDamages");
        selectedDamages = selectedDamages.filter((obj) => obj.value !== pElem.innerText);

        const selectDamage = document.getElementById(
          "card-item__select-damage",
        ) as HTMLSelectElement;
        selectDamage.options[selectedObj.id].classList.remove("hidden");
        elem.remove();
      }

      console.log(selectedObj);
    }
  };

  // При выборе повреждения
  const handleSelectDamage = (event: Event) => {
    const elem = event.currentTarget as HTMLSelectElement;
    const prevElem = elem.previousSibling as HTMLLIElement;

    const newLiElem = document.createElement("li");
    newLiElem.addEventListener("click", handleDeleteDamage);
    newLiElem.classList.add("flex");
    const newPElem = document.createElement("p");
    newPElem.classList.add(
      "bg-white",
      "px-2",
      "border-l",
      "border-y",
      "border-green-500",
      "rounded-l",
    );
    newPElem.innerText = elem.value;
    const newBtnElem = document.createElement("button");
    newBtnElem.classList.add(
      "bg-white",
      "px-2",
      "border-r",
      "border-y",
      "border-green-500",
      "rounded-r",
    );
    newBtnElem.innerText = "x";

    newLiElem.appendChild(newPElem);
    newLiElem.appendChild(newBtnElem);
    prevElem.parentNode?.insertBefore(newLiElem, prevElem.nextSibling);

    selectedDamages.push({ id: elem.selectedIndex, value: elem.value });
    console.log(`handleSelectDamage ${elem.value}`);
    console.log(selectedDamages);

    // Скрывем выбранный option
    elem.options[elem.selectedIndex].classList.add("hidden");
    // Устанавливаем значание select по умолчанию
    elem.value = "выбирите повреждение";
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

    selectDamage.addEventListener("change", handleSelectDamage); // В чем отличие change от input?

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
      selectedDamages = []; // Удалям все ранее выбранные повреждения

      removeBtn.classList.remove("hidden");
      saveBtn.innerText = "Сохранить";

      if (lastElementID != element.id) {
        // Срабатывает каждый раз когда зашли в редактировать на элементе
        console.log("first visit card");

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
