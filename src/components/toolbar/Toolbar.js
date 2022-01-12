import { createToolbar } from './toolbar.template'
import { $ } from '../../core/dom'
import { ExcelStateComponent } from '../../core/ExcelStateComponents'
import { defaultStyle } from '../../constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    })
  }
  prepare() {
    this.initState(defaultStyle)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChange(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.dataset.type === 'button') {
      const value = JSON.parse($target.dataset.value)

      // передаем в Table данные о нажатой кнопке в toolbar
      this.$emit('toolbar:applyStyle', value)

      //базовое отображение было
      // const key = Object.keys(value)[0]
      // this.setState({ [key]: value[key] })
    }
  }
}
