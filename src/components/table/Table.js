import { $ } from '../../core/dom'
import { ExcelComponent } from '../../core/ExcelComponent'
import { resizeHandler } from './table.resize'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  toHTML() {
    return createTable(20) //создаем таблицу
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeHandler(this.$root, event) // запускаем ресайз
    }
  }

  onMouseup() {}
  onClick() {}
}
