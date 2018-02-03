import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Footer from './partials/footer'
import PageContainer from './pages/page_container'
import Nav from './partials/nav'

const App = ({ store }) => (
  <section id="app" className="row">
    <div className="col-md-8 offset-md-2">
      <Nav/>
      <Provider store={store}> 
        <PageContainer/>
      </Provider>
      <Footer/>
    </div>
  </section>
)

export default App
