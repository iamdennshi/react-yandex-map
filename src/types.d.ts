type TreeInfo = {
    id: number,
    img: string,
    cords: number[],
    name: string,
    state: number,
    comment: string,
    height: number,
    diameter: number,
    age: number,

};

type FurnitureInfo = {
    id: number,
    img: string,
    cords: number[],
    name: string,
    state: number,
    comment: string,
};

type PlaceInfo = {
    id: number,
    cords: number[],
    address: string
}


type AddButtonType = {
    onAdd: MouseEventHandler;
};
