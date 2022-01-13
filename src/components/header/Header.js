import { defaultTitle } from '../../constants'
import { $ } from '../../core/dom'
import { ExcelComponent } from '../../core/ExcelComponent'
import { ActiveRoute } from '../../core/routes/ActiveRoute'
import { debounce } from '../../core/utils'
import * as actions from '../redux/actionCreators'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
            <div class="button" >
              <span class="material-icons" data-button="exit"> logout </span>
            </div>
            <div class="button">
              <span class="material-icons" data-button="remove"> delete </span>
            </div>
          </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.dataset.button == 'remove') {
      const decision = confirm('Точно удалить эту таблицу')
      if (decision) {
        localStorage.removeItem('Excel: ' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.dataset.button == 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
