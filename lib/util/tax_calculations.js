import min from 'lodash/min'
import {
  FEDERAL_INCOME_TAX_BRACKETS,
  MEDICARE_TAX_MULTIPLIER,
  SOCIAL_SECURITY_TAX_MULTIPLIER,
  STATE_INCOME_TAX_BRACKETS,
} from '../constants/tax_data'

export const afterTaxIncome = ({ annualIncome, state, taxFilingStatus }) => {
  const federalTaxBracket = FEDERAL_INCOME_TAX_BRACKETS[taxFilingStatus]
  const federalTaxes = incomeTax({ annualIncome, taxBrackets: federalTaxBracket })
  const stateTaxBracket = STATE_INCOME_TAX_BRACKETS[state]
  const stateTaxes = incomeTax({ annualIncome, taxBrackets: stateTaxBracket })
  const otherTaxes = socialSecurityAndMedicareTax(annualIncome)
  const netIncome = annualIncome - federalTaxes - stateTaxes - otherTaxes
  return parseFloat(netIncome).toFixed(2) // Round to 2 decimal places
}

export const combinedContributionLimit = ({ annualIncome, currentAge }) => {
  const maxAnnualIRAContribution = currentAge >= 50 ? 6500 : 5500
  return min([maxAnnualIRAContribution, Number(annualIncome)])
}

export const combinedTaxPercentage = (annualIncome, afterTaxIncome) => (
  parseFloat(100 * (1 - afterTaxIncome / annualIncome)).toFixed(1)
)

const incomeTax = ({ annualIncome, taxBrackets }) => {
  let incomeRemaining = annualIncome
  const descendingTaxBrackets = Object.keys(taxBrackets).reverse()
  return descendingTaxBrackets.reduce((taxTotal, incomeMinimum) => {
    let taxedIncome = incomeRemaining - incomeMinimum
    let taxPercentage = taxBrackets[incomeMinimum]
    if (taxedIncome <= 0) return taxTotal;
    incomeRemaining -= taxedIncome
    return taxTotal += taxPercentage * taxedIncome
  }, 0)
}

const socialSecurityAndMedicareTax = (annualIncome) => (
  (MEDICARE_TAX_MULTIPLIER + SOCIAL_SECURITY_TAX_MULTIPLIER) * annualIncome
)

export const taxRefundFromIRADeduction = ({
  annualIncome,
  state,
  taxFilingStatus,
  traditionalIraDeduction,
}) => {
  const afterTaxIncomeWithoutDeduction = afterTaxIncome({
    annualIncome,
    state,
    taxFilingStatus,
  })
  const afterTaxIncomeWithDeduction = afterTaxIncome({
    annualIncome: annualIncome - traditionalIraDeduction,
    state,
    taxFilingStatus,
  })

  return afterTaxIncomeWithoutDeduction - afterTaxIncomeWithDeduction
}
