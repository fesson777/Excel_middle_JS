import { $ } from '../../core/dom'
import { ExcelComponent } from '../../core/ExcelComponent'
import { matrixPosition, nextSelector, parse } from '../../core/utils'
import { resizeHandler } from './table.resize'
import { createTable } from './table.template'
import { TableSelection } from './TableSelection'
import * as actions from '../redux/actionCreators'
import { defaultStyle } from '../../constants'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  toHTML() {
    return createTable(20, this.store.getState()) //создаем таблицу
  }

  prepare() {
    //вызывается до init в ExcelComponent
    this.selection = new TableSelection()
  }
  init() {
    super.init() // вызов наследуемого метода initDomListener
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', (value) => {
      this.selection.current.attr('data-value', value).text(parse(value))
      this.updateTextinStore(value)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value)
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds,
        })
      )
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    // getStyles  набор строчек - стилей, которые нам нужны (Dom)
    const styles = $cell.getStyles(Object.keys(defaultStyle))

    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event) // запускаем ресайз
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('resize data fail', e.message)
    }
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.resizeTable(event)
    }
    if (event.target.dataset.type === 'cell') {
      this.$emit('table:input', $(event.target))

      const $target = $(event.target)
      if (event.shiftKey) {
        //current live in selection.select
        const $cells = matrixPosition($target, this.selection.current).map(
          (id) => {
            return this.$root.find(`[data-id="${id}"]`)
          }
        )
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ]
    const { key } = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextinStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    )
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.updateTextinStore($(event.target).text())
  }
}
