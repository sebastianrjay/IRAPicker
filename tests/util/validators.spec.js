import '@babel/preset-env'
import { isValidZipCode, validateIRAContribution } from '../../lib/util/validators'

describe('validators', () => {
  describe('isValidZipCode', () => {
    it('should return true when input is a valid ZIP code', () => {
      const validInputs = ['10028', '10028-2024']
      validInputs.forEach(input => {
        expect(isValidZipCode(input)).toEqual(true)
      })
    })

    it('should return true when input is an invalid ZIP code', () => {
      const invalidInputs = [
        '1002',
        '100282',
        '100z8',
        '10028-244',
      ]
      invalidInputs.forEach(input => {
        expect(isValidZipCode(input)).toEqual(false)
      })
    })
  })

  describe('validateIRAContribution', () => {
    const iraContributionLimit = 5500

    it('returns undefined for valid input', () => {
      const validInputs = [
        0,
        5,
        500,
        5500,
      ]
      validInputs.forEach(input => {
        expect(validateIRAContribution(iraContributionLimit)(null, input, null)).toEqual(undefined)
      })
    })

    it('returns error message for invalid input', () => {
      // redux-form input fields prevent negative input values
      const invalidInput = { iraContribution: 5501 }
      expect(validateIRAContribution(iraContributionLimit)(null, invalidInput, null))
        .toEqual(`Your maximum legal IRA account contribution this year is 
        $5,500.00.`)
    })
  })
})
