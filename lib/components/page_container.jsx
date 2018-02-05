import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CHANGE_PAGE } from '../constants/events'
import CurrentTaxesForm from './pages/forms/current_taxes_form'
import InvestmentPlanForm from './pages/forms/investment_plan_form'
import RetirementTaxesForm from './pages/forms/retirement_taxes_form'
import Summary from './pages/summary'
import Footer from './partials/footer'
import Nav from './partials/nav'

const headers = {
  1: 'Step 1: What is your IRA savings goal and income this year?',
  2: 'Step 2: What is your current basic tax info?',
  3: 'Step 3: What are your retirement plans?',
  4: 'Results',
}

const pages = {
  1: <InvestmentPlanForm/>,
  2: <CurrentTaxesForm/>,
  3: <RetirementTaxesForm/>,
  4: <Summary/>,
}

const FIRST_PAGE = 1
const LAST_PAGE = 4

const PageContainer = ({ changePage, currentPage, isCurrentFormValid }) => (
  <div>
    <Nav/>
    <div className="row mx-3 my-5 py-5">
      <div className="col-md-8 offset-md-2 col-sm-12">
        <h2 className="mb-5">{headers[currentPage]}</h2>
        {pages[currentPage]}
        {
          currentPage > FIRST_PAGE &&
          <button
            className="btn btn-lg btn-secondary float-left"
            onClick={() => changePage(currentPage - 1, true)}
          >
            <i className="fa fa-angle-left"></i>&nbsp;&nbsp;Back
          </button>
        }
        {
          currentPage < LAST_PAGE && 
          <button
            className="btn btn-lg btn-primary float-right"
            disabled={!isCurrentFormValid}
            onClick={() => changePage(currentPage + 1, false)}
          >
            Next&nbsp;&nbsp;<i className="fa fa-angle-right"></i>
          </button>
        }
      </div>
    </div>
    <Footer/>
  </div>
)

const mapStateToProps = (state, _ownProps) => state.pageContainer

const mapDispatchToProps = dispatch => ({
  changePage: (nextPage, isCurrentFormValid) => (
    dispatch({ type: CHANGE_PAGE, currentPage: nextPage, isCurrentFormValid })
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
