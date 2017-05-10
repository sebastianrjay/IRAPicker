import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as c from '../../constants/events'
import CurrentTaxesForm from './forms/current_taxes_form'
import InvestmentPlanForm from './forms/investment_plan_form'
import RetirementTaxesForm from './forms/retirement_taxes_form'

const form = {
  1: <InvestmentPlanForm/>,
  2: <CurrentTaxesForm/>,
  3: <RetirementTaxesForm/>,
}

const FIRST_PAGE = 1
const LAST_PAGE = 3

const FormContainer = ({ changePage, currentFormIsValid, currentPage }) => (
  <section className="form-container">
    {form[currentPage]}
    {
      currentPage > FIRST_PAGE &&
      <button onClick={changePage(currentPage - 1)}>Back</button>
    }
    {
      currentPage < LAST_PAGE && 
      // currentFormIsValid &&
      <button onClick={changePage(currentPage + 1)}>Next</button>
    }
  </section>
)

const mapStateToProps = (state, _ownProps) => state.formContainer

const mapDispatchToProps = dispatch => ({
  changePage: (nextPage) => () => (
    dispatch({ type: c.CHANGE_PAGE, currentPage: nextPage })
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer)
