import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import pageContainerReducer from './pages/page_container_reducer'

const reducer = combineReducers({
  form: formReducer,
  pageContainer: pageContainerReducer,
})

export default reducer
