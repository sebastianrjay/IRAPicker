import 'whatwg-fetch'

const key = 'AIzaSyBZP0cG-VNmTB86PoC8Ndz1vqrXky0d9A0'
const baseUrl =
  `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=`

const fetchZipCodeData = (zipCode) => {
  return fetch(baseUrl + zipCode).then(response => response.json())
}

export default fetchZipCodeData
