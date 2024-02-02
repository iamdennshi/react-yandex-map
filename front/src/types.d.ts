declare let Android;

interface Base {
  id: number;
  cords: number[];
}

interface MarkProps extends Base {
  onClickMark: (id: number, type: boolean) => void;
  currentObjectID: number;
}

type ElementType = "furniture" | "tree";

interface ElementInfo extends Base {
  name: string;
  comment: string;
}

interface TreeInfo extends ElementInfo {
  height: number;
  photos: number[];
  trunkDiameter: number;
  aestaticAssessment: int;
  age: number;
  crownProjection: number;
  typeOfDamage: number[];
  sanitaryCondition: number;
  recommendation: number[];
  trunkNumber: number;
  lastChange: Date;
}

interface FurnitureInfo extends ElementInfo {
  photos: number[];
}

interface ObjectInfo extends Base {
  address: string;
}

interface ActionBarProps {
  hideActionBar: boolean;
  totalElements: { trees: number; furnitures: number };
  currentObjectCords: number[];
  hideUI: (type: boolean) => void;
}

interface SectionStatProps {
  totalElements: { trees: number; furnitures: number };
  children: string;
}

interface SectionProps {
  active: number;
  prevActive: number;
  totalElements: { trees: number; furnitures: number };
}

interface ItemWithDescProps {
  title: string;
  description: string;
}

interface AddingModeProps {
  currentObjectCords: number[];
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

interface SearchBoxProps {
  objects: ObjectInfo[];
  currentObjectID: number;
  setCurrentObjectID: (number) => void;
  hideSearch: boolean;
  setHideActionBar: (boolean) => void;
}
