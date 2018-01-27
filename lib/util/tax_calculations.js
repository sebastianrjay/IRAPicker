import min from 'lodash/min'
import {
  ANNUAL_ROI_MULTIPLIER,
  FEDERAL_INCOME_TAX_BRACKETS,
  MEDICARE_TAX_MULTIPLIER,
  SOCIAL_SECURITY_TAX_MULTIPLIER,
  STATE_INCOME_TAX_BRACKETS,
} from '../constants/tax_data'

export const accountBalanceAtRetirement = ({
  combinedContribution,
  currentAge,
  iraTaxRefund,
  retirementAge,
}) => {
  let accountBalance = 0
  const totalYears = retirementAge - currentAge
  for (let elapsedYears = 1; elapsedYears <= totalYears; elapsedYears++) {
    accountBalance += combinedContribution + iraTaxRefund
    accountBalance *= 1 + ANNUAL_ROI_MULTIPLIER
  }

  return accountBalance
}

export const afterTaxIncome = ({ annualIncome, state, taxFilingStatus }) => {
  const federalTaxBracket = FEDERAL_INCOME_TAX_BRACKETS[taxFilingStatus]
  const federalTaxes = incomeTax({ annualIncome, taxBrackets: federalTaxBracket })
  const stateTaxBracket = STATE_INCOME_TAX_BRACKETS[state]
  const stateTaxes = incomeTax({ annualIncome, taxBrackets: stateTaxBracket })
  const otherTaxes = socialSecurityAndMedicareTax(annualIncome)
  const netIncome = annualIncome - federalTaxes - stateTaxes - otherTaxes
  return Number(parseFloat(netIncome).toFixed(2)) // Round to 2 decimal places
}

export const beforeTaxIncome = ({ afterTaxIncome, state, taxFilingStatus }) => {
  
}

export const combinedContributionLimit = ({ annualIncome, currentAge }) => {
  const maxAnnualIRAContribution = currentAge >= 50 ? 6500 : 5500
  return min([maxAnnualIRAContribution, Number(annualIncome)])
}

export const combinedTaxPercentage = (annualIncome, afterTaxIncome) => (
  Number(parseFloat(100 * (1 - afterTaxIncome / annualIncome)).toFixed(1))
)

const incomeTax = ({ annualIncome, taxBrackets }) => {
  let incomeRemaining = annualIncome
  const descendingTaxBrackets = Object.keys(taxBrackets).reverse()
  return descendingTaxBrackets.reduce((taxTotal, bracketIncomeMinimum) => {
    let taxedIncome = incomeRemaining - bracketIncomeMinimum
    const taxPercentage = taxBrackets[bracketIncomeMinimum]
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
