declare var Android;

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
  onClickMark: Function;
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
  onClickMark: Function;
}

interface PlaceInfo {
  id: number;
  cords: number[];
  address: string;
  parameters: PlaceParams;
  trees: TreeInfo[];
  furniture: FurnitureInfo[];
}

interface PlaceParams {
  totalArea: number;
}

interface AddButtonType {
  onAdd: MouseEventHandler;
}

interface ActionBarProps extends AddButtonType {
  hideActionBar: boolean;
  place: PlaceInfo;
  toggleUI: Function;
}

type TypeItem = "furniture" | "tree";
