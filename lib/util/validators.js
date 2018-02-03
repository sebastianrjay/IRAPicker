import { toDollarString } from './page_helpers'

export const isNaN = (obj) => obj !== obj

export const validateCombinedContribution = (iraContributionLimit) => {
  return (_val, allValues, _props) => {
    if (allValues.iraContribution > iraContributionLimit) {
      return `Your maximum legal IRA account contribution this year is 
        ${toDollarString(iraContributionLimit)}.`
    }
  }
}

export const validateNumber = ({ field, isCurrency }) => {
  return (_val, allValues, _props) => {
    const value = allValues[field] || ''
    const isInvalid = isCurrency ?
                        isNaN(Number(value.replace(/[$\,]/g, '')))
                        :
                        isNaN(Number(value.replace(/[\,]/g, '')))

    if (isInvalid) {
      return `Please enter a valid number${isCurrency ? ' or dollar amount' : ''}.`
    }
  }
}

export const isValidZipCode = (zipCode) => (
  /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode)
)
