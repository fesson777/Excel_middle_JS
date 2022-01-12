import { Excel } from './components/excel/Excel'
import { Formula } from './components/formula/Formula'
import { Header } from './components/header/Header'
import { initialState } from './components/redux/initialState'
import { rootReducer } from './components/redux/rootReducer'
import { Table } from './components/table/Table'
import { Toolbar } from './components/toolbar/Toolbar'
import { createStore } from './core/createStore'
import { debounce, storage } from './core/utils'
import './scss/index.scss'

const store = createStore(rootReducer, initialState)

const stateListener = debounce((state) => {
  console.log('State from Excel', state)
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})
excel.render()
