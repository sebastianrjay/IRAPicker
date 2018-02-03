import React, { Component } from 'react'
import { Provider } from 'react-redux'
import PageContainer from './page_container'

const App = ({ store }) => (
  <Provider store={store}> 
    <PageContainer/>
  </Provider>
)

export default App
