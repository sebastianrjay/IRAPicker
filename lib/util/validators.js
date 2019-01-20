import { normalizeNumber, toDollarString } from './page_helpers'

const isNaN = (obj) => obj !== obj

export const isValidZipCode = (zipCode) => (
  /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode)
)

export const validateIRAContribution = (iraContributionLimit) => {
  return (_val, allValues, _props) => {
    const iraContribution = normalizeNumber(allValues.iraContribution)
    if (iraContribution > iraContributionLimit) {
      return `Your maximum legal IRA account contribution this year is 
        ${toDollarString(iraContributionLimit)}.`
    }
  }
}

export const validateNumber = ({ field }) => {
  return (_val, allValues, _props) => {
    const value = allValues[field]
    const isInvalid = isNaN(Number(value))
    if (isInvalid) return 'Please enter a valid number.'
  }
}
