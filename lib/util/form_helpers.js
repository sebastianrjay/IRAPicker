import get from 'lodash/get'
import React from 'react'
import { change } from 'redux-form'
import { VALIDATE_CURRENT_FORM } from '../constants/events'

const getAsyncError = (props) => {
  const formName = props.form
  const inputName = props.input.name
  return get(props, `${formName}.asyncErrors.${inputName}`)
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
  const asyncError = getAsyncError(props)

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
  const asyncError = getAsyncError(props)

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
  const asyncError = getAsyncError(props)

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

export const toDollarString = (number) => (
  `$${parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`
)
