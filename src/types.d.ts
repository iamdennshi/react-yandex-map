type MarkInfo = {
    id: number;
    cords: number[];
    type: number,
    name: string,
    info: TreeInfo 
};

type TreeInfo = {
    height: number,
    diameter: number,
    age: number,
    state: number,
    comment: string,
}

type OtherInfo = {
    
}

type AddButtonType = {
    onAdd: MouseEventHandler;
};
