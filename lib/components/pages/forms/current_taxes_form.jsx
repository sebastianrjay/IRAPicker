import get from 'lodash/get'
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import BaseForm from '../../partials/base_form'
import {
  mapFormStateToProps,
  renderCheckboxField,
  renderInputField,
  renderSelectField,
  renderSpinnerInputField,
} from '../../../util/form_helpers'
import { toDollarString } from '../../../util/page_helpers'
import {
  afterIncomeTaxIncome,
  combinedTaxPercentage,
} from '../../../util/tax_calculations'
import fetchZipCodeData from '../../../actions/fetch_zip_code_data'
import { TAX_FILING_STATUSES } from '../../../constants/tax_data'

class CurrentTaxesForm extends BaseForm {
  componentWillMount () {
    this.props.asyncValidate() // Enable immediate page switch if form is valid
  }

  render () {
    const { isLoading } = this.formData()
    const taxFilingStatus = this.formData().taxFilingStatus || ''
    const isMarried = taxFilingStatus.match(/Married/)
    return (
      <form className="mb-5" onKeyUp={() => this.props.asyncValidate()}>
        <Field
          component={renderSelectField}
          label="What is your tax filing status?"
          name="taxFilingStatus"
          options={TAX_FILING_STATUSES}
        />
        <Field
          component={renderCheckboxField}
          label="Are you covered by an employee retirement plan, such as a 401(k)?"
          name="has401k"
        />
        <div className={isMarried ? 'form-check' : 'form-check disabled'}>
          <label className="form-check-label" htmlFor="spouseHas401k">
            <Field
              className="form-check-input"
              disabled={!isMarried}
              name="spouseHas401k" 
              component="input" 
              type="checkbox"
            />
            &nbsp;Is your spouse covered by an employee retirement plan?
          </label>
        </div>
        <Field
          component={renderInputField}
          label="Enter your current U.S. ZIP code, for income tax estimation purposes." 
          name="zipCode" 
          type="text"
        />
        <Field
          component={renderSpinnerInputField}
          disabled
          isLoading={isLoading}
          label="City"
          name="city"
          type="text"
        />
        <Field
          component={renderSpinnerInputField}
          disabled
          isLoading={isLoading}
          label="State"
          name="state"
          type="text"
        />
        {
          this.showTaxesPaid()
            ? <p className="small">{this.taxesPaidCopy()}</p>
            : null
        }
      </form>
    )
  }

  showTaxesPaid () {
    return this.formData().zipCode && this.formData().state
  }

  taxesPaidCopy () {
    const annualIncome = get(this.props, 'investmentPlan.values.annualIncome')
    const { state, taxFilingStatus } = this.formData()
    const netIncome = afterIncomeTaxIncome({ annualIncome, state, taxFilingStatus })
    const taxPercentage = combinedTaxPercentage(annualIncome, netIncome)
    return `You will pay approximately ${taxPercentage}% of your income in 
      federal and state taxes this year, including Medicare and Social Security 
      contributions and excluding any municipal or county taxes. You will earn 
      around ${toDollarString(netIncome)} after taxes, excluding your tax refund 
      from any traditional IRA contribution(s).`
  }
}

CurrentTaxesForm = reduxForm({
  asyncBlurFields: ['zipCode'],
  asyncValidate: fetchZipCodeData,
  destroyOnUnmount: false,
  form: 'currentTaxes',
  initialValues: {
    has401k: false,
    spouseHas401k: false,
    taxFilingStatus: TAX_FILING_STATUSES[0],
  },
})(CurrentTaxesForm)

export default connect(mapFormStateToProps)(CurrentTaxesForm)
