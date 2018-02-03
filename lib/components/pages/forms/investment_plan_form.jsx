import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import BaseForm from '../../partials/base_form'
import { iraContributionLimit } from '../../../util/tax_calculations'
import {
  mapFormDispatchToProps,
  mapFormStateToProps,
  renderCheckboxField,
  renderFormField,
} from '../../../util/form_helpers'
import { toDollarString } from '../../../util/page_helpers'
import {
  validateIRAContribution,
  validateNumber,
} from '../../../util/validators'

class InvestmentPlanForm extends BaseForm {
  contributionLabel (contributionLimit) {
    return `How much of your income do you plan to invest in your IRA this year? 
      You can invest a maximum of ${toDollarString(contributionLimit)} during 
      tax year 2018.`
  }

  isValid () {
    const { annualIncome, currentAge, iraContribution } = this.formData()
    return annualIncome && currentAge && iraContribution && this.hasNoErrors()
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
          component={renderFormField}
          label="Current Annual Modified Adjusted Gross Income"
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
            validateIRAContribution(contributionLimit)
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

export default connect(mapFormStateToProps, mapFormDispatchToProps)(InvestmentPlanForm)
