import at from 'lodash/at'
import get from 'lodash/get'
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { STATES } from '../../../constants/tax_data'
import {
  mapDispatchToProps,
  mapStateToProps,
  renderFormField,
  renderSelectField,
} from '../../../util/form_helpers'
import Summary from '../../partials/summary.jsx'
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
        </div>
        <Summary {...this.summaryProps()} />
      </form>
    )
  }

  summaryProps () {
    const formDataObjects = at(this.props, [
      'currentTaxes.values',
      'investmentPlan.values',
      'retirementTaxes.values',
    ])
    return merge({}, ...formDataObjects)
  }
}

RetirementTaxesForm = reduxForm({
  destroyOnUnmount: false,
  form: 'retirementTaxes',
})(RetirementTaxesForm)

export default connect(mapStateToProps, mapDispatchToProps)(RetirementTaxesForm)
