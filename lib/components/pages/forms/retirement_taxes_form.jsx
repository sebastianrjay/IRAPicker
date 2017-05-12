import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  mapDispatchToProps,
  mapStateToProps,
  renderInputField
} from '../../../util/redux_form_helpers'
import { validateNumber } from '../../../util/validators'

class RetirementTaxesForm extends Component {
  formData(prop) {
    return _.get(this.props, `retirementTaxes.${prop}`) || {} 
  }

  isValid() {
    const formData = this.formData('values')
    const { retirementAge, retirementIncome, retirementState } = formData
    const hasNoErrors = _.isEmpty(this.formData('syncErrors'))

    return retirementAge && retirementIncome && retirementState && hasNoErrors
  }

  render () {
    return (
      <form onKeyUp={() => this.props.setFormValidity(this.isValid())}>
        <div>
          <label>Retirement State</label>
          <Field name="retirementState" component={renderInputField} type="text"/>
          <label>Retirement Age</label>
          <Field name="retirementAge" component={renderInputField} type="text"
            validate={validateNumber({ field: 'retirementAge' })}/>
          <label>Desired After-Tax Retirement Income</label>
          <Field name="retirementIncome" component={renderInputField} type="text"
            validate={validateNumber({ field: 'retirementIncome', isCurrency: true })}/>
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
