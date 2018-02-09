import merge from 'lodash/merge'
import omit from 'lodash/omit'
import { CHANGE_PAGE, VALIDATE_CURRENT_FORM } from '../../constants/events'

const initialState = {
  currentPage: 1,
  isCurrentFormValid: true,
}

const pageContainerReducer = (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_PAGE:
    case VALIDATE_CURRENT_FORM:
      return merge({}, state, omit(action, 'type'))
    default:
      return state
  }
}

export default pageContainerReducer
