import 'whatwg-fetch'
import { GOOGLE_MAPS_API_KEY as key } from '../../config/secrets'

const GOOGLE_MAPS_BASE_URL =
  `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=`

const fetchZipCodeData = (zipCode) => {
  return fetch(GOOGLE_MAPS_BASE_URL + zipCode).then(response => response.json())
}

export default fetchZipCodeData
