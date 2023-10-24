export function createContentMark(
  type: TypeItem,
  body: string,
  placeID: number,
  info: FurnitureInfo | TreeInfo,
): string {
  const title = type == "tree" ? "дерево" : "МАФ";
  const stringify = JSON.stringify(info).replaceAll('"', "'");
  const handleEdit = `window.editMark(${placeID}, ${stringify}, '${type}')`;
  const infoImg = info.img;
  const infoTitle = info.name.toLocaleUpperCase();

  return `
  <div class='h-[600px] w-[300px]'>
  <div class="relative">
    <div class="absolute right-2 top-3 bg-white rounded-full p-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="#B2ABAB">
          <path d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99833 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941974 9.35021 0.000986589 9.11607 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z" fill="#024751" />
      </svg>
    </div>
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
  <div class="flex flex-col h-[300px]">
    <h2 class="text-center text-2xl font-bold text-primary  my-2 uppercase ">${infoTitle}</h2>
    <h3 class="w-[61px] mx-auto text-center rounded-md text-sm mb-2 ${
      type == "tree"
        ? "text-[#58D364] bg-[#DDFFE0]"
        : "text-[#D39658] bg-[#FFEEDD]"
    }">${title}</h3>
    <ul class="flex flex-col px-4 my-auto gap-2 max-h-44 overflow-y-scroll text-sm">
        ${body}
    </ul>
    <button onclick="${handleEdit}" class="block px-4 py-1 m-auto border-solid border-[1px] text-sm ${
      type == "tree"
        ? "text-[#58D364] border-[#58D364]"
        : "text-[#D39658] border-[#D39658]"
    }  rounded my-2">Редактировать</button>
    <div class="text-center text-gray mb-2 text-sm">Последнее изменение 02.07.2023 16:37</div>
  </div>
</div>`;
}
