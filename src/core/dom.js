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

  // from Formula input  to cell (через Emitter)
  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
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
  //querySelectorAll
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  css(styles = {}) {
    // для ресайза
    Object.keys(styles).forEach((someStyle) => {
      this.$el.style[someStyle] = styles[someStyle]
    })
  }
  // styles = []  набор строчек - стилей, которые нам нужны
  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }
  //querySelector for cell
  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }
  focus() {
    this.$el.focus()
    return this
  }
  id(parse) {
    // для data-id в cell
    if (parse) {
      const arrParsed = this.id().split(':')
      return {
        row: +arrParsed[0],
        col: +arrParsed[1],
      }
    }

    return this.dataset.id
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
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
