export default function (_objectID: number, element: TreeInfo | FurnitureInfo) {
  console.log(`${element.id} do remove mark`);

  window.dispatchEvent(
    new CustomEvent("onRemoveMark", {
      detail: { id: element.id },
    }),
  );

  // fetch(`http://192.168.1.100:8000/objects/${objectID}/elements/trees/${element.id}`, {
  //   method: "DELETE",
  // });
}
