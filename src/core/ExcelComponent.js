import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
  //возвращает шаблон компонента
  constructor($root, options = {}) {
    //options.listeners принимается с DomListener
    //и расширяется здесь до options = {}
    //options.name принимается с Компонентов через метод DomListener
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unSubscribers = []
    // this.storeUnSub = null
    this.prepare()
  }
  //Настраиваем компонент до itin
  prepare() {}

  //вызываем шаблон компонента
  toHTML() {
    return ''
  }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  //--- Сюда приходят торлько изменения по тем полям на
  //--- которые мы подписались
  storeChange() {}
  //
  // $subscribe(fn) {
  //   this.storeUnSub = this.store.subscribe(fn)
  // }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  //Уведомляем слушателей про события event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unSubscribers.push(unsub)
  }
  //инициализируем компоненты
  //добавляем DOM слушателей после рендера всех блоков
  init() {
    this.initDomListeners()
  }
  //удаем слушателей
  destroy() {
    this.removeDomListeners()
    this.unSubscribers.forEach((unsub) => unsub())
    // this.storeUnSub.unsubscribe()
  }
}
