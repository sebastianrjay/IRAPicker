import isEmpty from 'lodash/isEmpty'
import React, { Component } from 'react'

class BaseForm extends Component {
  componentWillMount () {
    if ('function' !== typeof this.isValid) return
    if ('function' !== typeof this.props.setFormValidity) return
    this.props.setFormValidity(this.isValid())
  }

  formData () {
    return this.props.formInput || {} 
  }

  formErrors () {
    return this.props.formErrors || {}
  }

  hasNoErrors () {
    return isEmpty(this.formErrors())
  }
}

export default BaseForm
