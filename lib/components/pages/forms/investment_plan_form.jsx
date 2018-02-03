import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { iraContributionLimit } from '../../../util/tax_calculations'
import {
  mapDispatchToProps,
  mapStateToProps,
  renderCheckboxField,
  renderFormField,
  toDollarString,
} from '../../../util/form_helpers'
import {
  validateCombinedContribution,
  validateNumber,
} from '../../../util/validators'

class InvestmentPlanForm extends Component {
  contributionLabel (contributionLimit) {
    return `How much of your income do you plan to invest in your IRA this year? 
      You can invest a maximum of ${toDollarString(contributionLimit)} 
      during tax year 2018.`
  }

  formData (prop) {
    return get(this.props, `investmentPlan.${prop}`) || {} 
  }

  isValid () {
    const formData = this.formData('values')
    const { annualIncome, iraContribution, currentAge } = formData
    const hasNoErrors = isEmpty(this.formData('syncErrors'))

    return annualIncome && iraContribution && currentAge && hasNoErrors
  }

  render () {
    const formData = this.formData('values')
    const contributionLimit = iraContributionLimit(formData)
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
          name="iraContribution"
          type="text" 
          validate={[
            validateNumber({ field: 'iraContribution' }),
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
