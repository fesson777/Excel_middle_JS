import { toInlineStyles } from '../../core/utils'
import {
  CHANGE_TEXT,
  CHANGE_STYLE,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE,
  DATE_CREATE,
} from './types'

export function rootReducer(state, action) {
  let field
  let val
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return { ...state, [field]: value(state, field, action) } //id, value колонки

    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      }

    case CHANGE_STYLE:
      return { ...state, currentStyles: action.data }

    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.data.value }
      })
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      }

    case CHANGE_TITLE:
      return { ...state, title: action.data }
    case DATE_CREATE:
      return { ...state, dateCreate: new Date().toJSON() }

    default:
      return state
  }
}

function value(state, field, action) {
  const prevState = state[field] || {}
  prevState[action.data.id] = action.data.value
  return prevState
}

//-==============было до рефакторинга===============

// export function rootReducer(state, action) {
//   let prevState
//   let field

//   switch (action.type) {
//     case TABLE_RESIZE:
//       field = action.data.type === 'col' ? 'colState' : 'rowState'
//       prevState = state[field] || {}
//       prevState[action.data.id] = action.data.value
//       return { ...state, [field]: prevState } //id, value колонки
//     case CHANGE_TEXT:
//       field = 'dataState'
//       prevState = state[field] || {}
//       prevState[action.data.id] = action.data.value
//       return { ...state, currentText: action.data.value, [field]: prevState }
//     default:
//       return state
//   }
// }
