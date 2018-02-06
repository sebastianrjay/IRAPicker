import get from 'lodash/get'
import React from 'react'
import { change } from 'redux-form'
import { VALIDATE_CURRENT_FORM } from '../constants/events'

const getAsyncError = (props) => {
  const formName = props.form
  const inputName = props.input.name
  return get(props, `${formName}.asyncErrors.${inputName}`)
}

export const mapFormDispatchToProps = dispatch => ({
  resetField: (formName, fieldName, value) => (
    dispatch(change(formName, fieldName, value))
  ),
  setFormValidity: (isValid) => (
    dispatch({ type: VALIDATE_CURRENT_FORM, isCurrentFormValid: !!isValid })
  ),
})

export const mapFormStateToProps = (state, _ownProps) => state.form

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
      <label htmlFor={props.name} className="form-check-label">
        <input
          {...props.input}
          checked={props.input.value}
          className="form-check-input"
          disabled= {props.disabled}
          type="checkbox"
        />
        &nbsp;{props.label}
      </label>
    </div>
  )
}

export const renderInputField = (props) => {
  const asyncError = getAsyncError(props)

  return (
    <div className={props.disabled ? 'form-group disabled' : 'form-group'}>
      <label htmlFor={props.name}>{props.label}</label>
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
      <label htmlFor={props.name}>{props.label}</label>
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

export const renderSpinnerInputField = (props) => {
  const asyncError = getAsyncError(props)

  return (
    <div className={props.disabled ? 'form-group disabled' : 'form-group'}>
      <label htmlFor={props.name}>{props.label}</label>
      {
        props.meta.touched && (props.meta.error || asyncError) &&
        <div className="alert alert-danger">
          {props.meta.error || asyncError}
        </div>
      }
      <div className={props.isLoading ? 'spinner__container' : null}>
        <i
          className={props.isLoading ? 'fa fa-circle-o-notch spinner' : 'hidden'}
          aria-hidden={!props.isLoading}
        ></i>
        <input
          {...props.input}
          className={
            props.isLoading ? 'form-control spinner__input' : 'form-control'
          }
          disabled={props.disabled}
          type={props.type}
        />
      </div>
    </div>
  )
}
