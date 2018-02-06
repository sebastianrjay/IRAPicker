import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import BaseForm from '../../partials/base_form'
import { iraContributionLimit } from '../../../util/tax_calculations'
import {
  mapFormDispatchToProps,
  mapFormStateToProps,
  normalizeDollarAmount,
  renderCheckboxField,
  renderCurrencyField,
  renderInputField,
} from '../../../util/form_helpers'
import { toDollarString } from '../../../util/page_helpers'
import {
  validateIRAContribution,
  validateNumber,
} from '../../../util/validators'

class InvestmentPlanForm extends BaseForm {
  contributionLabel (contributionLimit) {
    return `How much of your income do you plan to invest in your IRA account 
      this year? You can invest a maximum of ${toDollarString(contributionLimit)} 
      during tax year 2018.`
  }

  isValid () {
    const { annualIncome, currentAge, iraContribution } = this.formData()
    return (annualIncome || annualIncome === 0) && currentAge && 
      (iraContribution || iraContribution === 0) && this.hasNoErrors()
  }

  render () {
    const formData = this.formData()
    const contributionLimit = iraContributionLimit(formData)
    const contributionLabel = this.contributionLabel(contributionLimit)

    return (
      <form
        className="mb-5"
        onKeyUp={() => this.props.setFormValidity(this.isValid())}
      >
        <Field
          component={renderCurrencyField}
          label="Current Annual Modified Adjusted Gross Income"
          name="annualIncome"
          normalize={normalizeDollarAmount}
          type="text"
        />
        <p className="small">
          Click <a
            target="_blank"
            href="http://money.cnn.com/tmp/networth2.html"
          > here </a> to calculate your Modified Adjusted Gross Income. Be sure 
          to leave the IRA deduction field blank.
        </p>
        <Field
          component={renderInputField}
          label="Current Age"
          name="currentAge"
          type="text"
          validate={validateNumber({ field: 'currentAge' })}
        />
        <Field
          component={renderCurrencyField}
          label={contributionLabel}
          name="iraContribution"
          normalize={normalizeDollarAmount}
          type="text" 
          validate={validateIRAContribution(contributionLimit)}
        />
      </form>
    )
  }
}

InvestmentPlanForm = reduxForm({
  destroyOnUnmount: false,
  form: 'investmentPlan',
  initialValues: {
    annualIncome: 0,
    iraContribution: 0,
  }
})(InvestmentPlanForm)

export default connect(mapFormStateToProps, mapFormDispatchToProps)(InvestmentPlanForm)
