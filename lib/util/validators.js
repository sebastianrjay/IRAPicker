export const isNaN = (obj) => obj !== obj

export const validateCombinedContribution = (contributionLimit) => {
  return (_val, allValues, _props) => {
    if (allValues.combinedContribution > contributionLimit) {
      return `Your maximum legal retirement account contribution this year is 
        $${contributionLimit}.00.`
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
