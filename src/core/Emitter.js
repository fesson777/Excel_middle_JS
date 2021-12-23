export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // Уведомляем слушателей, если они есть
  //table.emit('table:select', {a: 1})
  emit(event, ...args) {
    //eventName кастомная, какая угодно
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach((listenersFN) => {
      listenersFN(...args)
    })
    return true
  }
  //Подписываемся на уведомления (либо добавляем нового слушателя)
  //formula.emit('table:select', ()=> {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listenersFN) => listenersFN !== fn
      )
    }
  }

  unsubscribe() {}
}

// test--test--test--test--test--test--test

// const emitter = new Emitter()

// const subscr = emitter.subscribe('click', (data) => console.log('data', data))
// emitter.emit('click', 'from emitter-emit')

// setTimeout(() => {
//   emitter.emit('click', 'from emitter-emit after 2 second')
// }, 2000)
// setTimeout(() => {
//   subscr()
// }, 3000)
// setTimeout(() => {
//   emitter.emit('click', 'from emitter-emit after 4 second')
// }, 4000)
