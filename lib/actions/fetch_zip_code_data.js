import { change } from 'redux-form'
import apiFetchZipCodeData from '../api/fetch_zip_code_data'
import { VALIDATE_CURRENT_FORM } from '../constants/events'
import { isValidZipCode } from '../util/validators'

const errorObj = { zipCode: 'Please enter a valid zip code.' }

const resetCityAndState = (dispatch) => {
  dispatch(change('currentTaxes', 'city', null))
  dispatch(change('currentTaxes', 'state', null))
  dispatch({ type: VALIDATE_CURRENT_FORM, isCurrentFormValid: false })
  return errorObj
}

const lookUpCityAndState = (zipCode, dispatch) => (
  apiFetchZipCodeData(zipCode)
    .then((data) => {
      if (data.status === 'OK') {
        const city = data.results[0].address_components[1].long_name
        const state = data.results[0].address_components[3].short_name
        dispatch(change('currentTaxes', 'city', city))
        dispatch(change('currentTaxes', 'state', state))
        dispatch({ type: VALIDATE_CURRENT_FORM, isCurrentFormValid: true })
      } else {
        return resetCityAndState(dispatch)
      }
    })
    .catch(() => resetCityAndState(dispatch))
)

const fetchZipCodeData = ({ zipCode }, dispatch) => {
  if (isValidZipCode(zipCode)) {
    return lookUpCityAndState(zipCode, dispatch)
  } else {
    return Promise.resolve(resetCityAndState(dispatch))
  }
}

export default fetchZipCodeData
