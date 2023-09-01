export const treesData : TreeInfo[] = [
    {
        id: 0,
        cords: [59.928194, 30.346644],
        name: "дуб",
        img: "https://flowertimes.ru/wp-content/uploads/2021/10/buk-derevo.jpg",
        comment: "Дуб хорошо узнаваем благодаря его плодам, желудям",
        state: 0, // состояние
        height: 100,
        diameter: 30.5,
        age: 53,

    },
]


export const furnitureData : FurnitureInfo[] = [
    {
        id: 0,
        cords: [59.928194, 28.349644],
        name: "Лавочка",
        img: "https://hozotdel.ru/wa-data/public/shop/products/39/51/5139/images/21410/21410.970.jpg",
        state: 0, // состояние
        comment: "Слишком шикарная, чтобы стоять в парке",
    },
]

export const placesData : PlaceInfo[] = [
    {
        id: 0,
        cords: [40.928194, 30.349644],
        address: "Пермь, сад Декабристов"
    },
    {
        id: 1,
        cords: [50.928194, 30.349644],
        address: "Пермь, сад имени Любимова"
    }
]


export default {treesData, furnitureData, placesData};