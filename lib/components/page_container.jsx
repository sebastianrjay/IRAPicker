import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CHANGE_PAGE } from '../constants/events'
import CurrentTaxesForm from './pages/forms/current_taxes_form'
import InvestmentPlanForm from './pages/forms/investment_plan_form'
import RetirementTaxesForm from './pages/forms/retirement_taxes_form'
import Intro from './pages/intro'
import Summary from './pages/summary'
import Footer from './partials/footer'
import Nav from './partials/nav'

const HEADERS = {
  1: 'IRA Picker',
  2: 'Step 1: What are your IRA savings goal and income this year?',
  3: 'Step 2: What is your current basic tax info?',
  4: 'Step 3: What are your retirement plans?',
  5: 'Results',
}

const NEXT_BUTTON_LABELS = {
  1: 'Get Started',
  4: 'Results',
}

const nextButtonLabel = (page) => NEXT_BUTTON_LABELS[page] || 'Next'

const PAGES = {
  1: <Intro/>,
  2: <InvestmentPlanForm/>,
  3: <CurrentTaxesForm/>,
  4: <RetirementTaxesForm/>,
  5: <Summary/>,
}

const FIRST_PAGE = 1
const LAST_PAGE = 5

const PageContainer = ({ changePage, currentPage, isCurrentFormValid }) => (
  <div>
    <Nav/>
    <div className="row mx-3 my-5 py-5">
      <div className="col-md-8 offset-md-2 col-sm-12">
        <h2 className="mb-5">{HEADERS[currentPage]}</h2>
        {PAGES[currentPage]}
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
              disabled={currentPage !== FIRST_PAGE && !isCurrentFormValid}
              onClick={() => {
                window.scrollTo(0, 0)
                changePage(currentPage + 1, false)
              }}
            >
              {nextButtonLabel(currentPage)}
              &nbsp;&nbsp;<i className="fa fa-angle-right"></i>
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
