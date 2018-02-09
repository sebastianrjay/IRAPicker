import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import BaseForm from '../../partials/base_form'
import { STATES, TAX_FILING_STATUSES } from '../../../constants/tax_data'
import {
  mapFormDispatchToProps,
  mapFormStateToProps,
  normalizeDollarAmount,
  renderCurrencyField,
  renderInputField,
  renderSelectField,
} from '../../../util/form_helpers'
import { validateNumber } from '../../../util/validators'

class RetirementTaxesForm extends BaseForm {
  isValid () {
    const {
      retirementAge,
      retirementIncome,
      retirementState,
      retirementTaxFilingStatus,
    } = this.formData()
    return retirementAge && (retirementIncome || retirementIncome === 0) && 
      retirementState && retirementTaxFilingStatus && this.hasNoErrors()
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
          component={renderInputField}
          label="Planned Retirement Age"
          name="retirementAge"
          type="text"
          validate={validateNumber({ field: 'retirementAge' })}
        />
        <Field
          component={renderSelectField}
          label="Anticipated Retirement Tax Filing Status"
          name="retirementTaxFilingStatus"
          options={TAX_FILING_STATUSES}
        />
        <Field
          component={renderCurrencyField}
          label="Desired Annual After-Tax Retirement Income"
          name="retirementIncome"
          normalize={normalizeDollarAmount}
          type="text"
        />
      </form>
    )
  }
}

RetirementTaxesForm = reduxForm({
  destroyOnUnmount: false,
  form: 'retirementTaxes',
  initialValues: {
    retirementState: STATES[0],
    retirementTaxFilingStatus: TAX_FILING_STATUSES[0],
  },
})(RetirementTaxesForm)

export default connect(mapFormStateToProps, mapFormDispatchToProps)(RetirementTaxesForm)
