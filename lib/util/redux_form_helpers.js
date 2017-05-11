import _ from 'lodash'
import React from 'react'
import { VALIDATE_CURRENT_FORM } from '../constants/events'

export const mapDispatchToProps = dispatch => ({
  setFormValidity: (isValid) => (
    dispatch({ type: VALIDATE_CURRENT_FORM, isCurrentFormValid: !!isValid })
  ),
})

export const mapStateToProps = (state, _ownProps) => state.form

export const renderInputField = (props) => {
  const formName = props.form
  const inputName = props.input.name
  const asyncError = _.get(props, `${formName}.asyncErrors.${inputName}`)
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
