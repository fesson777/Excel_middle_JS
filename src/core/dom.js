class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }
  html(html = '') {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  clear() {
    this.html('')
    return this
  }
  // element node from Excel ($.create)
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    this.$el.append(node)
    return this
  }
  // для ресайза таблицы
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  //получение координат колонок и рядов
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  //для получения data atrribute с кол и строк // getter, вызов без ()
  get dataset() {
    return this.$el.dataset
  }
  //querySelector
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  css(styles = {}) {
    // для ресайза
    Object.keys(styles).forEach((someStyle) => {
      this.$el.style[someStyle] = styles[someStyle]
    })
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }

  return $(el)
}
