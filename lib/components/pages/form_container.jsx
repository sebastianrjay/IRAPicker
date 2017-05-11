import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CHANGE_PAGE } from '../../constants/events'
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

const FormContainer = ({ changePage, currentPage, isCurrentFormValid }) => (
  <section className="form-container">
    {form[currentPage]}
    {
      currentPage > FIRST_PAGE &&
      <button onClick={() => changePage(currentPage - 1, true)}>Back</button>
    }
    {
      currentPage < LAST_PAGE && 
      <button
        disabled={!isCurrentFormValid}
        onClick={() => changePage(currentPage + 1, false)}
      >
        Next
      </button>
    }
  </section>
)

const mapStateToProps = (state, _ownProps) => state.formContainer

const mapDispatchToProps = dispatch => ({
  changePage: (nextPage, isCurrentFormValid) => (
    dispatch({ type: CHANGE_PAGE, currentPage: nextPage, isCurrentFormValid })
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer)
