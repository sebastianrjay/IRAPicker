import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { combinedContributionLimit } from '../../../util/calculations'
import {
  mapDispatchToProps,
  mapStateToProps,
  renderCheckboxField,
  renderFormField,
} from '../../../util/form_helpers'
import {
  validateCombinedContribution,
  validateNumber,
} from '../../../util/validators'

class InvestmentPlanForm extends Component {
  contributionLabel (contributionLimit) {
    return `How much of your income do you plan to invest in retirement accounts 
      this year, including all personal and employer 401(k) contributions? You 
      can invest a maximum of $${contributionLimit}.00 during tax year 2017.`
  }

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
    const contributionLimit = combinedContributionLimit(formData)
    const contributionLabel = this.contributionLabel(contributionLimit)

    return (
      <form onKeyUp={() => this.props.setFormValidity(this.isValid())}>
        <Field
          component={renderFormField}
          label="Current Annual MAGI"
          name="annualIncome"
          type="text"
          validate={validateNumber({ field: 'annualIncome', isCurrency: true })}
        />
        <p>
          Click <a
            target="_blank"
            href="http://money.cnn.com/tmp/networth2.html"
          > here </a> to calculate your Modified Adjusted Gross Income. Be sure 
          to leave the IRA deduction field blank.
        </p>
        <Field
          component={renderFormField}
          label="Current Age"
          name="currentAge"
          type="text"
          validate={validateNumber({ field: 'currentAge' })}
        />
        <Field
          component={renderFormField}
          label={contributionLabel}
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
    spouseHas401k: false,
  },
})(InvestmentPlanForm)

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentPlanForm)
