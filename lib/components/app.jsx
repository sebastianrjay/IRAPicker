import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Footer from './layouts/footer'
import FormContainer from './pages/form_container'
import Nav from './layouts/nav'

const App = ({ store }) => (
  <section id="app" className="row">
    <div className="col-md-8 offset-md-2">
      <Nav/>
      <Provider store={store}> 
        <FormContainer/>
      </Provider>
      <Footer/>
    </div>
  </section>
)

export default App
