export function createWrapperContent(body: string = "") {
  return `
  <div id="card-item" class='relative h-[600px] w-[300px] ${
    body == "" && "flex items-center justify-center"
  }'>
    <div class="absolute right-2 top-3 bg-white rounded-full p-2 z-10">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="#B2ABAB">
          <path d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99833 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941974 9.35021 0.000986589 9.11607 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z" fill="#024751" />
      </svg>
      
    </div>
    ${body == "" ? '<span class="loader"></span>' : body}
  </div>
  `;
}

export function createContentMark(
  elementType: ElementType,
  body: string,
  objectID: number,
  elementInfo: TreeInfo,
): string {
  const title = elementType == "tree" ? "дерево" : "Элемент благоустройства";
  const stringify = JSON.stringify(elementInfo).replaceAll('"', "'");
  const handleEdit = `window.editMark(${objectID}, ${stringify})`;
  const handleRemove = `window.removeMark(${objectID}, ${stringify})`;
  const infoImg = elementInfo.photos[0];
  const infoTitle = elementInfo.name;
  const dateTime = new Date(elementInfo.lastChange);
  const dateTimeString = `Последнее изменение ${dateTime
    .getDate()
    .toString()
    .padStart(2, "0")}.${dateTime
    .getMonth()
    .toString()
    .padStart(2, "0")}.${dateTime.getFullYear()} ${dateTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${dateTime.getMinutes().toString().padStart(2, "0")}`;

  return createWrapperContent(`
  <div id="card-item" class=' relative h-[600px] w-[300px]'>
  <div class="relative">
    <input type="checkbox" id="card-height-toggle">
    <label for="card-height-toggle">
      <div class="absolute right-4 bottom-5 bg-white rounded-full p-3 rotate-45 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 10 10" fill="#B2ABAB">
          <path d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99833 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941974 9.35021 0.000986589 9.11607 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z" fill="#58D364" />
      </svg>
      </div>
    </label>
    <img id="card-img" class="transition-all duration-500 w-full object-cover" src="${infoImg}"/>
  </div>
  <div  class="flex flex-col h-[300px]">
    <div class="my-2">
      <input type="text" id="card-item__title" maxlength="18" class="card-title" disabled value="${infoTitle}"/>
      <p class="hidden text-red-500 text-sm font-bold text-center">⚠ Введите коректное название элемента</p>
    </div>
    <h3 class="w-[61px] mx-auto text-center rounded-md text-sm mb-2 ${
      elementType == "tree" ? "text-[#58D364] bg-[#DDFFE0]" : "text-[#D39658] bg-[#FFEEDD]"
    }">${title}</h3>
    <ul id="card-item__body" class="flex flex-col px-4 my-auto gap-2 max-h-44 overflow-y-scroll text-sm">
        ${body}
    </ul>
    <div class="flex">
    <button id="card-item__save" onclick="${handleEdit}" class="block  px-4 py-1 m-auto  border-solid border-[1px] text-sm ${
      elementType == "tree" ? "text-[#58D364] border-[#58D364]" : "text-[#D39658] border-[#D39658]"
    }  rounded my-2">Редактировать</button>      
    <button id="card-item__remove" onclick="${handleRemove}" class="hidden px-4 py-1 m-auto  border-solid border-[1px] text-sm rounded my-2 text-red-500 border-red-500">Удалить</button>

    </div>

    <div class="text-center text-gray mb-2 text-sm">${dateTimeString}</div>
  </div>
</div>`);
}

export const AGE = ["не более 5 лет", "не более 10 лет", "от 10 до 20 лет", "до 40 и более лет"];

export const AESTATIC = [
  "отличная",
  "хорошая",
  "удовлетворительная",
  "неудовлетворительная",
  "аварийное",
];

export const DAMAGE = [
  "1 дупло",
  "2 дупла",
  "более 2 дупел",
  "морозобоина",
  "несколько морозобоин",
  "сухобочина",
  "трещина",
  "механическое повреждение ствола",
  "отслойка коры",
  "в стволе инородные предметы",
  "усохшие скелетные ветви",
  "наличие капа или сувеля",
  "наличие плодовых тел",
  "ствол наклонен",
  "ствол искривлен",
  "вершина ствола сломана на высоте",
  "развилка ствола на высоте",
  "повреждение корней",
  "обнажение корневых лап",
  "обтаптывание корней",
  "повреждения при прокладке инженерных сетей",
  "повреждение кроны",
  "изменен цвет листвы/хвои",
  "измельчение листьев/хвои",
  "повреждение вредителями",
  "повреждение болезнями",
  "механические повреждения кроны",
];

export const SANITARY = [
  "здоровые (без признаков ослабления)",
  "ослабленные",
  "сильно ослабленные",
  "усыхающие",
  "погибшие",
  "свежий сухостой",
  "свежий ветровал",
  "свежий бурелом",
  "старый сухостой",
  "старый ветровал",
  "старый бурелом",
];

export const RECOMMENDATION = [
  "рубка с последующей корчевкой прикорневого кома",
  "рубка с дроблением пил",
  "обрезка санитарная кроны до 5 сухих сучьев",
  "обрезка санитарная кроны от 6 до 15 сухих сучьев",
  "обрезка санитарная кроны более 15 сухих сучьев",
  "обрезка вершины",
  "обрезка формовочная кроны слабая",
  "обрезка формовочная кроны средняя",
  "обрезка формовочная кроны сильная",
  "лечение ран ствола и корневых лап размером до 1 дм³",
  "лечение ран ствола и корневых лап размером более 1 до 5 дм³",
  "лечение ран ствола и корневых лап размером более 5 до 10 дм³",
  "лечение ран ствола и корневых лап размером более 10 дм³",
  "лечение и пломбирование дупла размером до 10 дм²",
  "лечение и пломбирование дупла размером более 10 до 30 дм ³",
  "лечение и пломбирование дупла размером более 30 дм³",
  "закраска ран ствола и корневых лап размером до 1 дм²",
  "закраска ран ствола и корневых лап размером от 1 до 5 дм³",
  "закраска ран ствола и корневых лап размером более 5 до 10 дм³",
  "закраска ран ствола и корневых лап размером более 10 дм³",
  "санитарная рубка",
  "рубки ухода",
  "удаление поросли",
  "удаление водяных побегов",
  "удаление плодовых тел",
  "крепление ствола подпорками",
  "стягивание ствола (при развале кроны)",
  "засыпка корней",
  "комплексный уход",
  "обработка химикатами",
];
