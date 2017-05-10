import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import formContainerReducer from './pages/form_container_reducer'

const reducer = combineReducers({
  form: formReducer,
  formContainer: formContainerReducer,
})

export default reducer
