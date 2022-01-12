import { defaultStyle, defaultTitle } from '../../constants'
import { storage } from '../../core/utils'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyle,
  stylesState: {},
  title: defaultTitle,
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyle,
  currentText: '',
})

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState
