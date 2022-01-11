import { createToolbar } from './toolbar.template'
import { $ } from '../../core/dom'
import { ExcelStateComponent } from '../../core/ExcelStateComponents'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    })
  }
  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal',
    }
    this.initState(initialState)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.dataset.type === 'button') {
      const value = JSON.parse($target.dataset.value)
      const key = Object.keys(value)[0]
      this.setState({ [key]: value[key] })
      console.log(this.state)
    }
  }
}
