import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { renderInputField } from '../../../util/redux_form_helpers'
import {
  validateCombinedContribution,
  validateNumber,
} from '../../../util/validators'

const combinedContributionLimit = ({
  annualIncome,
  currentAge,
  has401k,
  has401kMatching,
}) => {
  const isFiftyPlus = currentAge >= 50
  annualIncome = Number(annualIncome)

  if (isFiftyPlus && has401k && has401kMatching) {
    return _.min([60000, annualIncome])
  } else if (has401k && has401kMatching) {
    return _.min([54000, annualIncome])
  } else if (isFiftyPlus && has401k) {
    return _.min([24000, annualIncome])
  } else if (has401k) {
    return _.min([18000, annualIncome])
  } else if (isFiftyPlus) {
    return _.min([6500, annualIncome])
  } else return _.min([5500, annualIncome])
}

class InvestmentPlanForm extends Component {
  render() {
    const formData = _.get(this.props, 'investmentPlan.values') || {}
    const { annualIncome, currentAge, has401k, has401kMatching } = formData
    const contributionLimit = combinedContributionLimit(formData)

    return (
      <form>
        <div>
          <label>Current Annual Income</label>
          <Field name="annualIncome" component={renderInputField} type="text"
            validate={validateNumber({ field: 'annualIncome', isCurrency: true })}/>
        </div>
        <div>
          <label>Current Age</label>
          <Field name="currentAge" component={renderInputField} type="text"
            validate={validateNumber({ field: 'currentAge' })}/>
        </div>
        <div>
          <label htmlFor="has401k">
            Does your employer enable you to invest in a 401(k)?
          </label>
          <div>
            <Field name="has401k" component="input" type="checkbox"/>
          </div>
        </div>
        {
          has401k &&
          <div>
            <label htmlFor="has401kMatching">
              Does your employer match your 401(k) contributions?
            </label>
            <div>
              <Field name="has401kMatching" component="input" type="checkbox"/>
            </div>
          </div>
        }
        <div>
          <label htmlFor="combinedContribution">
            How much of your income do you plan to invest in retirement accounts 
            this year, including all personal and employer 401(k) contributions? 
            You can invest a maximum of ${contributionLimit}.00 during tax year 
            2017.
          </label>
          <div>
            <Field name="combinedContribution" component={renderInputField} type="text" 
              validate={[
                validateNumber({ field: 'combinedContribution' }),
                validateCombinedContribution(contributionLimit)
              ]}/>
          </div>
        </div>
      </form>
    )
  }
}

InvestmentPlanForm = reduxForm({
  form: 'investmentPlan',
})(InvestmentPlanForm)

const mapStateToProps = (state, _ownProps) => state.form

export default connect(mapStateToProps)(InvestmentPlanForm)
