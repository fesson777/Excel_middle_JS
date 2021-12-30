import { $ } from '../../core/dom'

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target) // instanse class Dom
    // console.log($resizer.$el.parentNode) //bad
    // console.log($resizer.$el.closest('.column')) better

    const $parent = $resizer.closest('[data-type="resizable"]')
    const type = $resizer.dataset.resize
    const rowOrColResize = type === 'col' ? 'bottom' : 'right'

    $resizer.css({
      opacity: 1,
      'z-index': 1000,
      [rowOrColResize]: '-2000px',
    })

    let value

    const cells = $root.findAll(`[data-col="${$parent.dataset.col}"]`) //test // this.$root принимается в Excel настраивается в DomListener, метод querySel создаем в Dom class  (findAll)

    const coords = $parent.getCoords()

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({ right: -delta + 'px' })
      } else {
        //type === 'row'
        $resizer.css({
          opacity: 1,
          'z-index': 1000,
          right: '-2000px',
        })
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({ bottom: -delta + 'px' })
      }
    }

    document.onmouseup = () => {
      document.onmouseup = null
      document.onmousemove = null
      if (type === 'col') {
        $parent.css({ width: value + 'px' })
        cells.forEach((el) => (el.style.width = value + 'px'))
        $resizer.css({ opacity: 0, 'z-index': 100, bottom: '0', right: 0 })
      } else {
        $parent.css({ height: value + 'px' })
        $resizer.css({ opacity: 0, 'z-index': 100, bottom: '0', bottom: 0 })
      }
      resolve({
        value,
        id: type === 'col' ? $parent.dataset.col : null,
      })
    }
  })
}
