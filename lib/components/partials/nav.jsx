import React from 'react'

const Nav = (props) => (
  <nav className="navbar navbar-inverse bg-primary fixed-top">
    <div className="navbar-inner">
      <div className="container-fluid">
        <span className="navbar-brand">
          <img className="logo__img" src="assets/piggy-bank-logo.png"></img>
          <span className="logo__text">IRA Picker</span>
        </span>
        <span className="navbar-text float-right">
          Choose the best IRA.
        </span>
      </div>
    </div>
  </nav>
)

export default Nav
