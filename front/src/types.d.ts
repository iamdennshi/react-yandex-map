declare let Android;

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

interface Mark {
  onClickMark: (id: number, type: boolean) => void;
}

interface TreeMarkProps extends Mark {
  info: TreeInfo;
  placeID: number;
}

interface FurnitureInfo {
  id: number;
  img: string;
  cords: number[];
  name: string;
  state: number;
  comment: string;
}

interface FurnitureProps extends Mark {
  info: FurnitureInfo;
  placeID: number;
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

interface ActionBarProps {
  hideActionBar: boolean;
  place: PlaceInfo;
  hideUI: (type: boolean) => void;
}

type TypeItem = "furniture" | "tree";

interface SectionStatProps {
  place: PlaceInfo;
  children: string;
}

interface SectionProps {
  active: number;
  prevActive: number;
  place: PlaceInfo;
}

interface ItemWithDescProps {
  title: string;
  description: string;
}

interface AddingModeProps {
  place: PlaceInfo;
  onCloseAdding: () => void;
}

interface NewMarkProps {
  onCloseAdding: () => void;
}

interface SectionButtonProps {
  id: number;
  isActive: boolean;
  onClick: (id: number) => void;
  icon: string;
  tabIndex: number;
}

interface AddNewItemButtonProps {
  onClick: MouseEventHandler;
  tabIndex: number;
}
