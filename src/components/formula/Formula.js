import { $ } from '../../core/dom'
import { ExcelComponent } from '../../core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    })
  }

  toHTML() {
    return `
    <div class="info">fx</div>
          <div id="formula" class="input" contenteditable="" spellcheck="false"></div>
    `
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.dataset.value)
    })
    // this.$on('table:input', ($cell) => {
    //   this.$formula.text($cell.text())
    // })
    // this.$subscribe((state) => {
    //   this.$formula.text(state.currentText)
    // })
  }
  // "отображение" конкретных изменений из store (class StoreSubscribe)
  //refactoring redux с компонента на глобальную подписку
  storeChange({ currentText }) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    //event.target.textContent.trim()  так как событие в DIV, а не в Input, text() in Dom

    this.$emit('formula:input', $(event.target).text())
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
