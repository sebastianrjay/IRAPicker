import get from 'lodash/get'
import pick from 'lodash/pick'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  mapStateToProps,
  renderCheckboxField,
  renderFormField,
  renderSelectField,
} from '../../../util/redux_form_helpers'
import fetchZipCodeData from '../../../actions/fetch_zip_code_data'
import { TAX_FILING_STATUSES } from '../../../constants/tax_data'

class CurrentTaxesForm extends Component {
  componentWillMount () {
    this.props.asyncValidate() // Enable immediate page switch if form is valid
  }

  formData (prop) {
    return get(this.props, `currentTaxes.${prop}`) || {} 
  }

  render () {
    const taxFilingStatus = this.formData('values').taxFilingStatus || ''
    const isMarried = taxFilingStatus.match(/Married/)
    return (
      <form onKeyUp={() => this.props.asyncValidate()}>
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
          component={renderFormField} 
          label="Enter your current ZIP code, for income tax estimation purposes." 
          name="zipCode" 
          type="text"
        />
        <Field
          component={renderFormField}
          disabled
          label="City"
          name="city"
          type="text"
        />
        <Field
          component={renderFormField}
          disabled
          label="State"
          name="state"
          type="text"
        />
      </form>
    )
  }
}

CurrentTaxesForm = reduxForm({
  asyncBlurFields: ['zipCode'],
  asyncValidate: fetchZipCodeData,
  destroyOnUnmount: false,
  form: 'currentTaxes',
})(CurrentTaxesForm)

export default connect(mapStateToProps)(CurrentTaxesForm)
