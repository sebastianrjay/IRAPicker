import pick from 'lodash/pick'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  mapStateToProps,
  renderInputField,
} from '../../../util/redux_form_helpers'
import fetchZipCodeData from '../../../actions/fetch_zip_code_data'

class CurrentTaxesForm extends Component {
  render () {
    return (
      <form onKeyUp={() => this.props.asyncValidate()}>
        <div>
          <label>
            Enter your current ZIP code, for income tax estimation purposes.
          </label>
          <Field name="zipCode" component={renderInputField} type="text"
            props={pick(this.props, ['form', 'input'])}/>
          <label>City</label>
          <Field name="city" component={renderInputField} type="text" disabled/>
          <label>State</label>
          <Field name="state" component={renderInputField} type="text" disabled/>
        </div>
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
