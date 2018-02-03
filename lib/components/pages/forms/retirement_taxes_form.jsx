import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import BaseForm from '../../partials/base_form'
import { STATES } from '../../../constants/tax_data'
import {
  mapFormDispatchToProps,
  mapFormStateToProps,
  renderFormField,
  renderSelectField,
} from '../../../util/form_helpers'
import { validateNumber } from '../../../util/validators'

class RetirementTaxesForm extends BaseForm {
  isValid () {
    const { retirementAge, retirementIncome, retirementState } = this.formData()
    const noErrors = this.hasNoErrors()
    return retirementAge && retirementIncome && retirementState && noErrors
  }

  render () {
    return (
      <form
        className="mb-5"
        onKeyUp={() => this.props.setFormValidity(this.isValid())}
      >
        <Field
          component={renderSelectField}
          label="Planned Retirement State"
          name="retirementState"
          options={STATES}
        />
        <Field
          component={renderFormField}
          label="Planned Retirement Age"
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
      </form>
    )
  }
}

RetirementTaxesForm = reduxForm({
  destroyOnUnmount: false,
  form: 'retirementTaxes',
})(RetirementTaxesForm)

export default connect(mapFormStateToProps, mapFormDispatchToProps)(RetirementTaxesForm)
