import { normalizeDollarAmount } from './form_helpers'
import { toDollarString } from './page_helpers'

const isNaN = (obj) => obj !== obj

export const isValidZipCode = (zipCode) => (
  /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode)
)

export const validateIRAContribution = (iraContributionLimit) => {
  return (_val, allValues, _props) => {
    const iraContribution = normalizeDollarAmount(allValues.iraContribution)
    if (iraContribution > iraContributionLimit) {
      return `Your maximum legal IRA account contribution this year is 
        ${toDollarString(iraContributionLimit)}.`
    }
  }
}

export const validateNumber = ({ field, isCurrency }) => {
  return (_val, allValues, _props) => {
    const value = allValues[field]
    const isInvalid = isNaN(Number(value))
    if (isInvalid) return 'Please enter a valid number.'
  }
}
