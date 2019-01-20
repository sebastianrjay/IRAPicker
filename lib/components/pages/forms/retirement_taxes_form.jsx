import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import BaseForm from '../../partials/base_form'
import {
  ANNUAL_INFLATION,
  STATES,
  TAX_FILING_STATUSES,
} from '../../../constants/tax_data'
import {
  mapAllFormStateToProps,
  mapFormDispatchToProps,
  normalizeNumber,
  renderCurrencyField,
  renderInputField,
  renderSelectField,
  toDollarString,
  toPercentage,
} from '../../../util/page_helpers'
import { validateNumber } from '../../../util/validators'

class RetirementTaxesForm extends BaseForm {
  inflationWarning () {
    const { currentAge, retirementAge, retirementIncome } = this.formData()
    const currentYear = Number((new Date()).getFullYear())
    const elapsedYears = (retirementAge - currentAge)
    const retirementYear = currentYear + elapsedYears
    const incomeMinusInflation =
      retirementIncome * Math.pow((1 - ANNUAL_INFLATION), elapsedYears)
    return `With ${toPercentage(ANNUAL_INFLATION)} annual inflation, 
      ${toDollarString(retirementIncome)} today will be worth 
      ${toDollarString(incomeMinusInflation)} in today's dollars by 
      ${retirementYear}, when you plan to retire.`
  }

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
    const { retirementAge, retirementIncome } = this.formData()
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
          normalize={normalizeNumber}
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
          normalize={normalizeNumber}
          type="text"
        />
        {
          retirementAge && retirementIncome ? 
            <p className="small">{this.inflationWarning()}</p> : null
        }
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

export default connect(mapAllFormStateToProps, mapFormDispatchToProps)(RetirementTaxesForm)
