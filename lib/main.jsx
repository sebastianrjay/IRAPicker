import React from 'react'
import ReactDOM from 'react-dom'
import { GOOGLE_ADSENSE_API_KEY } from '../config/secrets'
import store from './store/store'
import App from './components/app'

(adsbygoogle = window.adsbygoogle || []).push({
  google_ad_client: GOOGLE_ADSENSE_API_KEY,
  enable_page_level_ads: true
})

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  ReactDOM.render(<App store={store}/>, root)
})
