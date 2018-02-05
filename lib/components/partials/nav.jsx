import React from 'react'

const Nav = (props) => (
  <nav className="navbar navbar-inverse bg-primary fixed-top">
    <div className="navbar-inner">
      <div className="container-fluid">
        <span className="navbar-brand">
          <img className="logo-img" src="piggy-bank-logo.png"></img>
          <span className="logo-text">IRA Picker</span>
        </span>
        <span className="navbar-text float-right">
          Choose the best IRA.
        </span>
      </div>
    </div>
  </nav>
)

export default Nav
