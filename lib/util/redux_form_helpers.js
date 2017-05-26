import get from 'lodash/get'
import min from 'lodash/min'
import React from 'react'
import { VALIDATE_CURRENT_FORM } from '../constants/events'

export const combinedContributionLimit = ({
  annualIncome,
  currentAge,
  has401k,
  has401kMatching,
}) => {
  const isFiftyPlus = currentAge >= 50
  annualIncome = Number(annualIncome)

  if (isFiftyPlus && has401k && has401kMatching) {
    return min([60000, annualIncome])
  } else if (has401k && has401kMatching) {
    return min([54000, annualIncome])
  } else if (isFiftyPlus && has401k) {
    return min([24000, annualIncome])
  } else if (has401k) {
    return min([18000, annualIncome])
  } else if (isFiftyPlus) {
    return min([6500, annualIncome])
  } else return min([5500, annualIncome])
}

export const mapDispatchToProps = dispatch => ({
  setFormValidity: (isValid) => (
    dispatch({ type: VALIDATE_CURRENT_FORM, isCurrentFormValid: !!isValid })
  ),
})

export const mapStateToProps = (state, _ownProps) => state.form

export const renderInputField = (props) => {
  const formName = props.form
  const inputName = props.input.name
  const asyncError = get(props, `${formName}.asyncErrors.${inputName}`)
  return (
    <div className="input-row">
      <input {...props.input} type="text"/>
      {
        props.meta.touched && (props.meta.error || asyncError) && 
        <span className="error">{props.meta.error || asyncError}</span>
      }
    </div>
  )
}
