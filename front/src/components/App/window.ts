import "./types.d";
import { DAMAGE } from "../../utils";

type SelectDamage = { id: number; value: string };

window.makeEditMark = () => {
  let lastElementID = -1;
  let lastData = {};
  // id - номер option в select (для удаления)
  let selectedDamages: SelectDamage[] = [];

  // В режиме редактирования
  const onInput = (event: Event) => {
    const elem = event.currentTarget as HTMLInputElement;
    elem.nextElementSibling?.classList.add("hidden");
    console.log("onInput");
  };

  // При удалении повреждения
  const handleDeleteDamage = (event: Event) => {
    const damageElement = event.currentTarget as HTMLSelectElement;
    const clickedElement = event.target as HTMLElement;

    if (clickedElement instanceof HTMLButtonElement) {
      const damageText = (damageElement.firstElementChild as HTMLParagraphElement).innerText;

      // Получаем объект удаляемого повреждения
      const selectedDamageObj = selectedDamages.find((obj) => obj.value == damageText);
      if (selectedDamageObj) {
        // Удаляем из selectedDamages
        console.log(`handleDeleteDamage: ${selectedDamageObj.value}`);
        selectedDamages = selectedDamages.filter((obj) => obj.value !== damageText);

        const selectorDamages = document.getElementById(
          "card-item__select-damage",
        ) as HTMLSelectElement;
        selectorDamages.options[selectedDamageObj.id].classList.remove("hidden");
        damageElement.remove();
      }
    }
  };

  const insertDamage = (damage: SelectDamage) => {
    const selectDamage = document.getElementById("card-item__select-damage") as HTMLSelectElement;

    const newLiElement = document.createElement("li");
    newLiElement.addEventListener("click", handleDeleteDamage);
    newLiElement.classList.add("flex");
    const newPElement = document.createElement("p");
    newPElement.classList.add(
      "bg-white",
      "px-2",
      "border-l",
      "border-y",
      "border-green-500",
      "rounded-l-md",
    );
    newPElement.innerText = damage.value;
    const newBtnElement = document.createElement("button");
    newBtnElement.classList.add(
      "bg-white",
      "px-2",
      "border-r",
      "border-y",
      "border-green-500",
      "rounded-r-md",
    );
    newBtnElement.innerText = "x";

    newLiElement.appendChild(newPElement);
    newLiElement.appendChild(newBtnElement);
    selectDamage.parentElement?.insertBefore(newLiElement, selectDamage.nextElementSibling);
    // Скрывем выбранный option
    selectDamage.options[damage.id].classList.add("hidden");
    console.log(`insert: ${damage.id} ${damage.value}`);
  };

  // При выборе повреждения
  const handleSelectDamage = (event: Event) => {
    const selectedElement = event.currentTarget as HTMLSelectElement;
    const damage: SelectDamage = {
      id: selectedElement.selectedIndex,
      value: selectedElement.value,
    };

    insertDamage(damage);

    selectedDamages.push(damage);
    console.log(`handleSelectDamage: ${selectedElement.value}`);
    console.log(selectedDamages);

    // Устанавливаем значание select по умолчанию
    selectedElement.value = "выбирите повреждение";
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

        // Добавление обработчиков
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
        // Срабатывает каждый раз когда зашли в редактировать на элементе
        console.log("first visit card");
        // Получаем уже установленные повреждения
        selectedDamages = element.typeOfDamage.map((elem) => ({
          id: elem + 1,
          value: DAMAGE[elem],
        }));
        console.log(selectedDamages);

        lastElementID = element.id;

        lastData = {
          name: element.name,
          height: element.height,
          trunkDiameter: element.trunkDiameter,
          typeOfDamage: selectedDamages.map((i) => i.id - 1),
        };
      }

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

        // Удаление повреждений из разметки, добавленные в режиме редактирования
        while (selectDamage.nextElementSibling) {
          selectDamage.nextElementSibling.remove();
        }

        const newData = {
          name: title.value,
          height: Number(height.value),
          trunkDiameter: Number(trunkDiameter.value),
          typeOfDamage: selectedDamages.map((i) => i.id - 1),
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
