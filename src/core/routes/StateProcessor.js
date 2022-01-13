import { debounce } from '../utils'

export class StateProcessor {
  constructor(clientSaver, delay = 300) {
    this.clientSaver = clientSaver
    this.listen = debounce(this.listen.bind(this), delay)
  }
  listen(state) {
    this.clientSaver.save(state)
  }

  get() {
    return this.clientSaver.get()
  }
}
