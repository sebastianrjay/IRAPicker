import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CHANGE_PAGE } from '../../constants/events'
import CurrentTaxesForm from './forms/current_taxes_form'
import InvestmentPlanForm from './forms/investment_plan_form'
import RetirementTaxesForm from './forms/retirement_taxes_form'
import Summary from './summary'

const pages = {
  1: <InvestmentPlanForm/>,
  2: <CurrentTaxesForm/>,
  3: <RetirementTaxesForm/>,
  4: <Summary/>,
}

const FIRST_PAGE = 1
const LAST_PAGE = 4

const PageContainer = ({ changePage, currentPage, isCurrentFormValid }) => (
  <section>
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
  </section>
)

const mapStateToProps = (state, _ownProps) => state.pageContainer

const mapDispatchToProps = dispatch => ({
  changePage: (nextPage, isCurrentFormValid) => (
    dispatch({ type: CHANGE_PAGE, currentPage: nextPage, isCurrentFormValid })
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
