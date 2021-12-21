import { $ } from '@core/dom'

export class Excel {
  constructor(selector, options) {
    // this.$el = document.querySelector(selector)
    this.$el = $(selector)
    this.components = options.components || []
  }
  //для создания корневой НОДы для екселя (append)
  getRoot() {
    const $root = $.create('div', 'excel')
    // const $root = document.createElement('div')
    // $root.classList.add('excel')

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      // $el.innerHTML = component.toHTML()
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach((component) => component.init())
  }
}
