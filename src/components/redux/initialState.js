import { defaultStyle, defaultTitle } from '../../constants'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyle,
  stylesState: {},
  title: defaultTitle,
  dateCreate: new Date().toJSON(),
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyle,
  currentText: '',
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState
}
