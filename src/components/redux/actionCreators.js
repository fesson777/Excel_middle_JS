import {
  CHANGE_TEXT,
  CHANGE_STYLE,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE,
  DATE_CREATE,
} from './types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  }
}
export function changeStyles(data) {
  return {
    type: CHANGE_STYLE,
    data,
  }
}
//values, ids
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  }
}
export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data,
  }
}
export function dateCreate() {
  return {
    type: DATE_CREATE,
  }
}
