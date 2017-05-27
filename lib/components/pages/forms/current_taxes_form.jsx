import pick from 'lodash/pick'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  mapStateToProps,
  renderFormField,
} from '../../../util/redux_form_helpers'
import fetchZipCodeData from '../../../actions/fetch_zip_code_data'

class CurrentTaxesForm extends Component {
  componentWillMount () {
    this.props.asyncValidate() // Enable immediate page switch if form is valid
  }

  render () {
    return (
      <form onKeyUp={() => this.props.asyncValidate()}>
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
