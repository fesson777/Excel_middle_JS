import { $ } from '@core/dom'
import { Emitter } from '../../core/Emitter'
import { StoreSubscribers } from '../../core/StoreSubscriber'

export class Excel {
  constructor(selector, options) {
    // this.$el = document.querySelector(selector)
    this.$el = $(selector)
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscribers(this.store)
  }
  //для создания корневой НОДы для екселя (append)
  getRoot() {
    const $root = $.create('div', 'excel')
    // const $root = document.createElement('div')
    // $root.classList.add('excel')
    const componentOptions = { emitter: this.emitter, store: this.store }

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      // $el.innerHTML = component.toHTML()
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach((component) => component.destroy())
  }
}
