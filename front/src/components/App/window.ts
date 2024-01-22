import "./types.d";

window.makeEditMark = () => {
  let lastElementID = -1;
  let lastData = {};

  // В режиме редактирования
  const onInput = (event: Event) => {
    const elem = event.currentTarget as HTMLInputElement;
    elem.nextElementSibling?.classList.add("hidden");
  };

  return function (objectID: number, element: TreeInfo) {
    // Нахождение элемента по ИД быстрее, чем по классу
    const saveBtn = document.getElementById("card-item__save") as HTMLButtonElement;
    const removeBtn = document.getElementById("card-item__remove") as HTMLButtonElement;
    const title = document.getElementById("card-item__title") as HTMLInputElement;
    const height = document.getElementById("card-item__height") as HTMLInputElement;
    const bodyUlElement = document.getElementById("card-item__body") as HTMLInputElement;

    // При нажатии на Редактировать
    if (saveBtn.innerText == "Редактировать") {
      if (bodyUlElement) {
        const liElements = bodyUlElement.querySelectorAll("li");

        liElements.forEach((liElement) => {
          if (!liElement.classList.toggle("hidden")) {
            liElement.querySelector("input")!.addEventListener("click", onInput);
            console.log("add event");
          }
        });
      }
      title.removeAttribute("disabled");

      removeBtn.classList.remove("hidden");
      saveBtn.innerText = "Сохранить";

      if (lastElementID != element.id) {
        lastElementID = element.id;

        lastData = {
          name: element.name,
          height: element.height,
        };
      }
    } else {
      // При нажатии на Сохранить
      let isError = false;

      if (bodyUlElement) {
        const liElements = bodyUlElement.querySelectorAll("li");
        let prevElement: HTMLSpanElement | null = null;

        // Проверка корректности введенных значений
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
          const liElements = bodyUlElement.querySelectorAll("li");

          liElements.forEach((liElement) => {
            if (liElement.classList.toggle("hidden")) {
              console.log("remove event ");
              liElement.querySelector("input")!.removeEventListener("click", onInput);
            }
          });
        }
        console.log("not error");
        title.setAttribute("disabled", "true");

        removeBtn.classList.add("hidden");
        saveBtn.innerText = "Редактировать";

        const newData = {
          name: title.value,
          height: Number(height.value),
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
