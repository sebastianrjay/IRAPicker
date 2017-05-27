import get from 'lodash/get'
import min from 'lodash/min'
import React from 'react'
import { change } from 'redux-form'
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
  resetField: (formName, fieldName, value) => (
    dispatch(change(formName, fieldName, value))
  ),
  setFormValidity: (isValid) => (
    dispatch({ type: VALIDATE_CURRENT_FORM, isCurrentFormValid: !!isValid })
  ),
})

export const mapStateToProps = (state, _ownProps) => state.form

export const renderCheckboxField = (props) => {
  const formName = props.form
  const inputName = props.input.name
  const asyncError = get(props, `${formName}.asyncErrors.${inputName}`)

  return (
    <div className={props.disabled ? 'form-check disabled' : 'form-check'}>
      {
        props.meta.touched && (props.meta.error || asyncError) &&
        <div className="alert alert-danger">
          {props.meta.error || asyncError}
        </div>
      }
      <label className="form-check-label" htmlFor="has401k">
        <input
          {...props.input}
          className="form-check-input"
          disabled= {props.disabled}
          type="checkbox"
        />
        &nbsp;{props.label}
      </label>
    </div>
  )
}

export const renderFormField = (props) => {
  const formName = props.form
  const inputName = props.input.name
  const asyncError = get(props, `${formName}.asyncErrors.${inputName}`)
  return (
    <div className={props.disabled ? 'form-group disabled' : 'form-group'}>
      <label>{props.label}</label>
      {
        props.meta.touched && (props.meta.error || asyncError) &&
        <div className="alert alert-danger">
          {props.meta.error || asyncError}
        </div>
      }
      <input
        {...props.input}
        className="form-control"
        disabled={props.disabled}
        type={props.type}
      />
    </div>
  )
}

export const renderSelectField = (props) => {
  const formName = props.form
  const inputName = props.input.name
  const asyncError = get(props, `${formName}.asyncErrors.${inputName}`)
  return (
    <div className={props.disabled ? 'form-group disabled' : 'form-group'}>
      <label>{props.label}</label>
      {
        props.meta.touched && (props.meta.error || asyncError) &&
        <div className="alert alert-danger">
          {props.meta.error || asyncError}
        </div>
      }
      <select
        {...props.input}
        className="form-control"
        disabled={props.disabled}
      >
        {
          props.options.map(
            (value, idx) => <option key={idx} value={value}>{value}</option>
          )
        }
      </select>
    </div>
  )
}
