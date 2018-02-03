import camelCase from 'lodash/camelCase'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import React, { Component } from 'react'

class BaseForm extends Component {
  componentWillMount () {
    if ('function' !== typeof this.isValid) return
    if ('function' !== typeof this.props.setFormValidity) return
    this.props.setFormValidity(this.isValid())
  }

  formData () {
    return get(this.props, `${this.formName()}.values`) || {} 
  }

  formErrors () {
    return get(this.props, `${this.formName()}.syncErrors`) || {}
  }

  formName () {
    return camelCase(this.constructor.name.replace(/Form/, ''))
  }

  hasNoErrors () {
    return isEmpty(this.formErrors())
  }
}

export default BaseForm
