import { Placemark } from '@pbe/react-yandex-maps'

type MarkType = {
    title: string,
    cords: number[]
}

export default function Mark(props: MarkType) {
  return (
    <Placemark
    geometry={props.cords}
    options={{
      preset: 'islands#oliveStretchyIcon', // список темплейтов на сайте яндекса
      iconColor: 'green', // цвет иконки
    }}
    properties={{
      iconContent: props.title, // пару символов помещается
      hintContent: '<em>кликни меня</em>',
      balloonContent: `<div class="my-balloon">
      <h4>Наш адрес</h4>
      <p>
        Санкт-Петербург,
        <br />
        Владимирский проспект, 23, лит. А, офис 701
      </p>
      <a href="#">Схема проезда</a>
    </div>`,
    }}
  />
  )
}
