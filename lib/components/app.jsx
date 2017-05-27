import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Footer from './layouts/footer'
import FormContainer from './pages/form_container'
import Nav from './layouts/nav'

const App = ({ store }) => (
  <section id="app">
    <div className="col-md-2"/>
    <div className="col-md-8">
      <Nav/>
      <Provider store={store}> 
        <FormContainer/>
      </Provider>
      <Footer/>
    </div>
    <div className="col-md-2"/>
  </section>
)

export default App
