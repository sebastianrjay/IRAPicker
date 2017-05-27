import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { states } from '../../../constants/tax_data'
import {
  mapDispatchToProps,
  mapStateToProps,
  renderFormField,
  renderSelectField,
} from '../../../util/redux_form_helpers'
import { validateNumber } from '../../../util/validators'

class RetirementTaxesForm extends Component {
  formData (prop) {
    return get(this.props, `retirementTaxes.${prop}`) || {} 
  }

  isValid () {
    const formData = this.formData('values')
    const { retirementAge, retirementIncome, retirementState } = formData
    const hasNoErrors = isEmpty(this.formData('syncErrors'))

    return retirementAge && retirementIncome && retirementState && hasNoErrors
  }

  render () {
    return (
      <form onKeyUp={() => this.props.setFormValidity(this.isValid())}>
        <div>
          <Field
            component={renderSelectField}
            label="Retirement State"
            name="retirementState"
            options={states}
          />
          <Field
            component={renderFormField}
            label="Retirement Age"
            name="retirementAge"
            type="text"
            validate={validateNumber({ field: 'retirementAge' })}
          />
          <Field
            component={renderFormField}
            label="Desired Annual After-Tax Retirement Income"
            name="retirementIncome" 
            type="text"
            validate={validateNumber({ field: 'retirementIncome', isCurrency: true })}
          />
        </div>
      </form>
    )
  }
}

RetirementTaxesForm = reduxForm({
  destroyOnUnmount: false,
  form: 'retirementTaxes',
})(RetirementTaxesForm)

export default connect(mapStateToProps, mapDispatchToProps)(RetirementTaxesForm)
