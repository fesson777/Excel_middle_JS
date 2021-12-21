import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
  //возвращает шаблон компонента
  constructor($root, options = {}) {
    //options.listeners принимается с DomListener
    //и расширяется здесь до options = {}
    //options.name принимается с Компонентов через метод DomListener
    super($root, options.listeners)
    this.name = options.name || ''
  }
  toHTML() {
    return ''
  }
  //чтобы события активировались после рендера всех блоков
  init() {
    this.initDomListeners()
  }
  destroy() {
    this.removeDomListeners()
  }
}
