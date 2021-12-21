import { getNameMethod } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }
  initDomListeners() {
    // console.log(this.listeners, this.$root)
    this.listeners.forEach((listener) => {
      //получение названия события
      const method = getNameMethod(listener)
      //this.name передается с ExcelComponents
      if (!this[method]) {
        throw new Error(`Method ${method} not implemented in ${this.name}`)
      }
      //сокращение записи addEventListener
      //this[method] теряет контекст потому .bind
      // привязка ниже, чтобы функция callback в ON OFF была одна
      // и та же (решения №2)
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }
  // проблема this[method].bind(this) это новая функция из за bind //и  !не равна this[method]. Решения - сохранение методов из ON //в переменную и из неё в OFF (listeners[eventType] = callback) ////как вариант (решения №1)
  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getNameMethod(listener)
      this.$root.off(listener, this[method])
    })
  }
}
