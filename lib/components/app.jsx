import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Footer from './layouts/footer'
import FormContainer from './pages/form_container'
import Nav from './layouts/nav'

const App = ({ store }) => (
  <div id="app">
    <Nav/>
    <Provider store={store}> 
      <FormContainer/>
    </Provider>
    <Footer/>
  </div>
)

export default App
