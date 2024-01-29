import { DAMAGE } from "../../../utils";
import { SelectedDamage } from "./types";

window.makeEditMark = () => {
  const P_ELEMENT_STYLE = "bg-white, px-2, border-l, border-y, border-green-500, rounded-l-md";
  const BUTTON_ELEMENT_STYLE = "bg-white, px-2, border-r, border-y, border-green-500, rounded-r-md";
  let prevElementId = -1;
  let prevData = {};
  // Содержит объекты выбранных повреждений у элемента
  let selectedDamages: SelectedDamage[] = [];

  const handleInputClick = (event: Event) => {
    const elem = event.currentTarget as HTMLInputElement;
    // Скрываем ошибку
    elem.nextElementSibling?.classList.add("hidden");
    console.log("handleInputClick");
  };

  const handleDeleteDamageElement = (event: Event) => {
    const damageElement = event.currentTarget as HTMLSelectElement;
    const clickedElement = event.target as HTMLElement;

    if (clickedElement instanceof HTMLButtonElement) {
      const textOfDamageElement = (damageElement.firstElementChild as HTMLParagraphElement)
        .innerText;
      // Получаем объект удаляемого повреждения
      const selectedDamgeObject = selectedDamages.find((i) => i.value == textOfDamageElement);

      if (selectedDamgeObject) {
        console.log(`handleDeleteDamage: ${selectedDamgeObject.value}`);
        // Удаляем из selectedDamages выбранное повреждение
        selectedDamages = selectedDamages.filter((i) => i.value !== textOfDamageElement);

        const selectorDamages = document.getElementById(
          "card-item__selector-damages",
        ) as HTMLSelectElement;
        selectorDamages.options[selectedDamgeObject.id].classList.remove("hidden");
        damageElement.remove();
      }
    }
  };

  const insertDamage = (damage: SelectedDamage) => {
    const selectorDamages = document.getElementById(
      "card-item__selector-damages",
    ) as HTMLSelectElement;

    const newLiElement = document.createElement("li");
    newLiElement.addEventListener("click", handleDeleteDamageElement);
    newLiElement.classList.add("flex");
    const newPElement = document.createElement("p");
    newPElement.classList.add(...P_ELEMENT_STYLE.split(", "));
    newPElement.innerText = damage.value;
    const newBtnElement = document.createElement("button");
    newBtnElement.classList.add(...BUTTON_ELEMENT_STYLE.split(", "));
    newBtnElement.innerText = "x";
    newLiElement.appendChild(newPElement);
    newLiElement.appendChild(newBtnElement);
    selectorDamages.parentElement?.insertBefore(newLiElement, selectorDamages.nextElementSibling);

    // Скрывем выбранный option
    selectorDamages.options[damage.id].classList.add("hidden");
    console.log(`insert: ${damage.id} ${damage.value}`);
  };

  // При выборе повреждения
  const handleSelectDamage = (event: Event) => {
    const selectedDamage = event.currentTarget as HTMLSelectElement;
    const damage: SelectedDamage = {
      id: selectedDamage.selectedIndex,
      value: selectedDamage.value,
    };

    insertDamage(damage);

    selectedDamages.push(damage);
    console.log(`handleSelectDamage: ${selectedDamage.value}`);
    console.log(selectedDamages);

    // Устанавливаем значание select по умолчанию
    selectedDamage.value = "выбирите повреждение";
  };

  return function (objectID: number, element: TreeInfo) {
    const saveBtn = document.getElementById("card-item__save") as HTMLButtonElement;
    const removeBtn = document.getElementById("card-item__remove") as HTMLButtonElement;
    const title = document.getElementById("card-item__title") as HTMLInputElement;
    const height = document.getElementById("card-item__height") as HTMLInputElement;
    const trunkDiameter = document.getElementById("card-item__trunk-diameter") as HTMLInputElement;
    const bodyUlElement = document.getElementById("card-item__body") as HTMLInputElement;
    const selectorDamages = document.getElementById(
      "card-item__selector-damages",
    ) as HTMLSelectElement;

    // При нажатии на Редактировать
    if (saveBtn.textContent == "Редактировать") {
      if (bodyUlElement) {
        const liElements = bodyUlElement.querySelectorAll(":scope > li");

        // Добавление обработчиков
        liElements.forEach((liElement) => {
          if (!liElement.classList.toggle("hidden")) {
            const inputElement = liElement.querySelector("input");
            if (inputElement) {
              inputElement.addEventListener("click", handleInputClick);
              console.log("add event");
            }
          }
        });
      }

      selectorDamages.addEventListener("change", handleSelectDamage);
      title.addEventListener("click", handleInputClick);
      title.removeAttribute("disabled");
      removeBtn.classList.remove("hidden");
      saveBtn.innerText = "Сохранить";

      if (prevElementId != element.id) {
        prevElementId = element.id;

        prevData = {
          name: element.name,
          height: element.height,
          trunkDiameter: element.trunkDiameter,
          typeOfDamage: selectedDamages.map((i) => i.id - 1),
        };
      }

      // Получаем уже установленные повреждения
      selectedDamages = element.typeOfDamage.map((elem) => ({
        id: elem + 1,
        value: DAMAGE[elem],
      }));
      console.log(selectedDamages);
      // Вставляем повреждения для редактированя
      for (const i of selectedDamages) {
        insertDamage(i);
      }
    } else {
      // При нажатии на Сохранить
      let isError = false;

      if (bodyUlElement) {
        const liElements = bodyUlElement.querySelectorAll(":scope > :not(:first-child)");
        let prevElement: HTMLSpanElement | null = bodyUlElement.firstElementChild
          ?.firstElementChild as HTMLSpanElement;

        if (prevElement instanceof HTMLSpanElement) {
          if (title.value == "" || !isNaN(Number(title.value))) {
            // Проверка корректности введенного title
            // Если введена пуста строка
            // или при попытки преобразования к числу не получили NaN (т.е в value не записаны числа)
            isError = true;
            title.nextElementSibling?.classList.remove("hidden");
            console.log("title.value ", title.value);
          }

          // Проверка корректности введенных значений характеристик
          // FIXME -- разметка обновляются даже если характеристики не изменены
          liElements.forEach((liElement) => {
            if (!liElement.classList.contains("hidden")) {
              const dataset = prevElement?.dataset.type;
              console.log(prevElement);

              // Все характериситки, которые измеряются в сантиметрах
              if (dataset === "sm") {
                // Проверка выстоты
                const val = Number(liElement.querySelector("input")!.value);
                if (val <= 0) {
                  liElement.querySelector("p")?.classList.remove("hidden");
                  console.log("error 1");
                  isError = true;
                } else {
                  if (prevElement) {
                    prevElement.textContent = `${val} см`;
                  }
                }
              }
              // Все характериситики, которые имеют список значений
              else if (dataset === "list") {
                if (prevElement) {
                  console.log(selectedDamages);
                  if (selectedDamages.length != 0) {
                    prevElement.textContent = selectedDamages.map((i) => i.value).join();
                  } else {
                    prevElement.textContent = "Отсутсвуют";
                  }
                }
              }
            } else {
              prevElement = liElement.querySelector("span");
            }
          });
        }
      }
      if (!isError) {
        if (bodyUlElement) {
          const liElements = bodyUlElement.querySelectorAll(":scope > li");

          // Удаление обработчиков
          liElements.forEach((liElement) => {
            if (liElement.classList.toggle("hidden")) {
              const inputElement = liElement.querySelector("input");
              if (inputElement) {
                inputElement.removeEventListener("click", handleInputClick);
                console.log("remove event ");
              }
            }
          });
        }
        title.removeEventListener("click", handleInputClick);
        selectorDamages.removeEventListener("change", handleSelectDamage);

        console.log("not error");
        title.setAttribute("disabled", "true");

        removeBtn.classList.add("hidden");
        title.nextElementSibling?.classList.add("hidden");

        saveBtn.innerText = "Редактировать";

        // Удаление повреждений из разметки, добавленные в режиме редактирования
        while (selectorDamages.nextElementSibling) {
          selectorDamages.nextElementSibling.remove();
        }

        const newData = {
          name: title.value,
          height: Number(height.value),
          trunkDiameter: Number(trunkDiameter.value),
          typeOfDamage: selectedDamages.map((i) => i.id - 1),
        };

        if (JSON.stringify(prevData) != JSON.stringify(newData)) {
          console.log("UPDATE DATA ", newData);
          prevData = newData;

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

window.removeMark = (_objectID: number, element: TreeInfo | FurnitureInfo) => {
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
