import { defaultTitle } from '../../constants'
import { $ } from '../../core/dom'
import { ExcelComponent } from '../../core/ExcelComponent'
import { debounce } from '../../core/utils'
import * as actions from '../redux/actionCreators'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
          <input type="text" class="input" value=${title} />
          <div>
            <div class="button">
              <span class="material-icons"> logout </span>
            </div>
            <div class="button">
              <span class="material-icons"> delete </span>
            </div>
          </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }
}
