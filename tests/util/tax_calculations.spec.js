import '@babel/preset-env'
import * as t from '../../lib/util/tax_calculations'

describe('tax calculations', () => {
  describe('afterIncomeTaxIncome', () => {
    const props = {
      annualIncome: 100000,
      state: 'NY',
      taxFilingStatus: 'Single',
    }

    it('should return the correct amount', () => {
      expect(t.afterIncomeTaxIncome(props)).toEqual(65215.53) // Based on 2018 rates
    })
  })

  describe('afterCapitalGainsIncome', () => {
    const props = {
      annualIncome: 100000,
      state: 'FL',
      taxFilingStatus: 'Married Filing Jointly or Qualifying Widow(er)',
    }

    it('should return the correct amount', () => {
      expect(t.afterCapitalGainsIncome(props)).toEqual(96580.15) // Based on 2018 rates
    })
  })

  describe('accountBalanceAtRetirement', () => {
    let props = { currentAge: 27, retirementAge: 77 }

    it('returns the expected final account balance given an annual contribution', () => {
      ['contribution', 'iraContribution'].forEach(key => {
        props[key] = 100000
        expect(t.accountBalanceAtRetirement(props)).toEqual(51871969.31)
        props[key] = null
      })
    })
  })
})
