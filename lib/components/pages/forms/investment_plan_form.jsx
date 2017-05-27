import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  combinedContributionLimit,
  mapDispatchToProps,
  mapStateToProps,
  renderCheckboxField,
  renderFormField,
} from '../../../util/redux_form_helpers'
import {
  validateCombinedContribution,
  validateNumber,
} from '../../../util/validators'

class InvestmentPlanForm extends Component {
  formData (prop) {
    return get(this.props, `investmentPlan.${prop}`) || {} 
  }

  isValid () {
    const formData = this.formData('values')
    const { annualIncome, combinedContribution, currentAge } = formData
    const hasNoErrors = isEmpty(this.formData('syncErrors'))

    return annualIncome && combinedContribution && currentAge && hasNoErrors
  }

  render () {
    const formData = this.formData('values')
    const { has401k, has401kMatching } = formData
    if (!has401k && has401kMatching) {
      this.props.resetField('investmentPlan', 'has401kMatching', false)
    }
    const contributionLimit = combinedContributionLimit(formData)
    const combinedContributionLabel = `How much of your income do you plan to 
      invest in retirement accounts this year, including all personal and 
      employer 401(k) contributions? You can invest a maximum of 
      ${contributionLimit}.00 during tax year 2017.`

    return (
      <form onKeyUp={() => this.props.setFormValidity(this.isValid())}>
        <Field
          component={renderFormField}
          label="Current Annual Income"
          name="annualIncome"
          type="text"
          validate={validateNumber({ field: 'annualIncome', isCurrency: true })}
        />
        <Field
          component={renderFormField}
          label="Current Age"
          name="currentAge"
          type="text"
          validate={validateNumber({ field: 'currentAge' })}
        />
        <Field
          component={renderCheckboxField}
          label="Does your employer enable you to invest in a 401(k)?"
          name="has401k"
        />
        <div className={has401k ? 'form-check' : 'form-check disabled'}>
          <label className="form-check-label" htmlFor="has401kMatching">
            <Field
              className="form-check-input"
              disabled={!has401k}
              name="has401kMatching" 
              component="input" 
              type="checkbox"
            />
            &nbsp;Does your employer match your 401(k) contributions?
          </label>
        </div>
        <Field
          component={renderFormField}
          label={combinedContributionLabel}
          name="combinedContribution"
          type="text" 
          validate={[
            validateNumber({ field: 'combinedContribution' }),
            validateCombinedContribution(contributionLimit)
          ]}
        />
      </form>
    )
  }
}

InvestmentPlanForm = reduxForm({
  destroyOnUnmount: false,
  form: 'investmentPlan',
  initialValues: {
    has401k: false,
    has401kMatching: false,
  },
})(InvestmentPlanForm)

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentPlanForm)
