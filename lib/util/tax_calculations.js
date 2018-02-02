import max from 'lodash/max'
import merge from 'lodash/merge'
import min from 'lodash/min'
import {
  ANNUAL_ROI_MULTIPLIER,
  FEDERAL_INCOME_TAX_BRACKETS,
  MEDICARE_TAX_MULTIPLIER,
  SOCIAL_SECURITY_TAX_MULTIPLIER,
  STATE_INCOME_TAX_BRACKETS,
  TRADITIONAL_IRA_DEDUCTION_INCOME_LIMITS,
  UPPER_BOUND_TAX_MULTIPLIER,
} from '../constants/tax_data'

const incomeTax = ({ annualIncome, taxBrackets }) => {
  let incomeRemaining = annualIncome
  const descendingTaxBrackets = Object.keys(taxBrackets).reverse()
  return descendingTaxBrackets.reduce((taxTotal, bracketIncomeFloor) => {
    let taxedIncome = incomeRemaining - bracketIncomeFloor
    if (taxedIncome <= 0) return taxTotal;
    const taxPercentage = taxBrackets[bracketIncomeFloor]
    incomeRemaining -= taxedIncome
    return taxTotal += taxPercentage * taxedIncome
  }, 0)
}

const socialSecurityAndMedicareTax = (annualIncome) => (
  annualIncome * (MEDICARE_TAX_MULTIPLIER + SOCIAL_SECURITY_TAX_MULTIPLIER)
)

const toDollarAmount = (number) => Number(parseFloat(number).toFixed(2))

const traditionalIraTaxDeduction = ({
  annualIncome,
  combinedContribution,
  has401k,
  spousehas401k,
  taxFilingStatus,
}) => {
  let incomeLimit = TRADITIONAL_IRA_DEDUCTION_INCOME_LIMITS
                        .has401k[has401k][taxFilingStatus]

  if (incomeLimit !== null && 'object' === typeof incomeLimit) {
    incomeLimit = incomeLimit.spousehas401k[spousehas401k]
  }

  if (!incomeLimit || annualIncome < incomeLimit) {
    return combinedContribution
  } else {
    return 0
  } 
}

export const accountBalanceAtRetirement = ({
  combinedContribution,
  currentAge,
  iraTaxRefund,
  retirementAge,
}) => {
  let accountBalance = 0
  const totalYears = retirementAge - currentAge
  for (let elapsedYears = 1; elapsedYears <= totalYears; elapsedYears++) {
    accountBalance += Number(combinedContribution) + (iraTaxRefund || 0)
    accountBalance *= 1 + ANNUAL_ROI_MULTIPLIER
  }

  return toDollarAmount(accountBalance)
}

export const afterTaxIncome = ({ annualIncome, state, taxFilingStatus }) => {
  const federalTaxBracket = FEDERAL_INCOME_TAX_BRACKETS[taxFilingStatus]
  const stateTaxBracket = STATE_INCOME_TAX_BRACKETS[state]
  const federalTaxes = incomeTax({ annualIncome, taxBrackets: federalTaxBracket })
  const stateTaxes = incomeTax({ annualIncome, taxBrackets: stateTaxBracket })
  const otherTaxes = socialSecurityAndMedicareTax(annualIncome)
  const netIncome = annualIncome - federalTaxes - stateTaxes - otherTaxes
  return toDollarAmount(netIncome)
}

export const beforeTaxIncome = ({
  annualIncome,
  incomeLowerBound,
  incomeUpperBound,
  state,
  taxFilingStatus,
}) => {
  incomeLowerBound = toDollarAmount(incomeLowerBound) ||
    toDollarAmount(annualIncome)
  incomeUpperBound = toDollarAmount(incomeUpperBound) ||
    toDollarAmount(annualIncome / (1 - UPPER_BOUND_TAX_MULTIPLIER))

  const midpointIncome = toDollarAmount((incomeLowerBound + incomeUpperBound) / 2)
  const props = { annualIncome: midpointIncome, state, taxFilingStatus }
  const newAfterTaxIncome = afterTaxIncome(props)

  if (toDollarAmount(incomeUpperBound - .01) <= incomeLowerBound &&
      incomeLowerBound <= incomeUpperBound) {
    return toDollarAmount(incomeUpperBound)
  } else if (newAfterTaxIncome >= annualIncome) {
    return beforeTaxIncome(merge(props, {
      annualIncome,
      incomeLowerBound,
      incomeUpperBound: midpointIncome
    }))
  } else {
    return beforeTaxIncome(merge(props, {
      annualIncome,
      incomeLowerBound: midpointIncome,
      incomeUpperBound
    }))
  }
}

export const combinedContributionLimit = ({ annualIncome, currentAge }) => {
  const maxAnnualIRAContribution = currentAge >= 50 ? 6500 : 5500
  return min([maxAnnualIRAContribution, Number(annualIncome)])
}

export const combinedTaxPercentage = (annualIncome, afterTaxIncome) => (
  Number(parseFloat(100 * (1 - afterTaxIncome / annualIncome)).toFixed(1))
)

export const taxRefundFromIRADeduction = (props) => {
  const { annualIncome, state, taxFilingStatus } = props
  const iraDeduction = traditionalIraTaxDeduction(props)
  const afterTaxIncomeWithoutDeduction = afterTaxIncome(props)
  const afterTaxIncomeWithDeduction = afterTaxIncome({
    annualIncome: annualIncome - iraDeduction,
    state,
    taxFilingStatus,
  })

  return afterTaxIncomeWithoutDeduction - afterTaxIncomeWithDeduction
}
