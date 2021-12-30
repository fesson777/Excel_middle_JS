export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({ ...initialState }, { type: '__INIT__' })
  let listeners = []
  return {
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach((fn) => fn(state))
    },
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter((func) => func != fn)
        },
      }
    },
    getState() {
      return state
    },
  }
}
