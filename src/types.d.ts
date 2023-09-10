interface TreeInfo {
  id: number;
  img: string;
  cords: number[];
  name: string;
  state: number;
  comment: string;
  height: number;
  diameter: number;
  age: number;
}

interface TreeProps {
  info: TreeInfo;
  placeID: number;
  onOpenMark: Function;
  onCloseMark: Function;
}

interface FurnitureInfo {
  id: number;
  img: string;
  cords: number[];
  name: string;
  state: number;
  comment: string;
}

interface FurnitureProps {
  info: FurnitureInfo;
  placeID: number;
  onOpenMark: Function;
  onCloseMark: Function;
}

interface PlaceInfo {
  id: number;
  cords: number[];
  address: string;
  trees: TreeInfo[];
  furniture: FurnitureInfo[];
}

interface AddButtonType {
  onAdd: MouseEventHandler;
  hideAddButton: boolean;
}

type TypeItem = "furniture" | "tree";
