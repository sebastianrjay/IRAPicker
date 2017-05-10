import _ from 'lodash'
import * as c from '../../constants/events'

const initialState = {
  currentPage: 1,
}

const formContainerReducer = (state = initialState, action) => {
  switch(action.type) {
    case c.CHANGE_PAGE:
      return _.merge({}, state, action)
    default:
      return state
  }
}

export default formContainerReducer
