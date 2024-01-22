export declare global {
  interface Window {
    makeEditMark: () => (objectID: number, element: TreeInfo) => void;
    editMark: (objectID: number, element: TreeInfo) => void;
    removeMark: (objectID: number, itemInfo: TreeInfo) => void;

    isAndroid: boolean;
    ymap: ymaps.Map;
  }
}
