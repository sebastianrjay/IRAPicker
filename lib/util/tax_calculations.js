import max from 'lodash/max'
import merge from 'lodash/merge'
import min from 'lodash/min'
import {
  ANNUAL_ROI_MULTIPLIER,
  FEDERAL_CAPITAL_GAINS_TAX_BRACKETS,
  FEDERAL_INCOME_TAX_BRACKETS,
  MEDICARE_TAX_MULTIPLIER,
  SOCIAL_SECURITY_TAX_MULTIPLIER,
  STATE_CAPITAL_GAINS_TAX_BRACKETS,
  STATE_INCOME_TAX_BRACKETS,
  TRADITIONAL_IRA_DEDUCTION_INCOME_LIMITS,
  UPPER_BOUND_CAPITAL_GAINS_TAX_MULTIPLIER,
  UPPER_BOUND_INCOME_TAX_MULTIPLIER,
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

export const accountBalanceAtRetirement = ({
  contribution,
  currentAge,
  iraContribution,
  retirementAge,
}) => {
  let accountBalance = 0
  const totalYears = Number(retirementAge) - Number(currentAge)
  for (let elapsedYears = 1; elapsedYears <= totalYears; elapsedYears++) {
    accountBalance += Number(contribution || iraContribution)
    accountBalance *= 1 + ANNUAL_ROI_MULTIPLIER
  }

  return toDollarAmount(accountBalance)
}

export const afterCapitalGainsIncome = ({ annualIncome, state, taxFilingStatus }) => {
  const federalTaxBracket = FEDERAL_CAPITAL_GAINS_TAX_BRACKETS[taxFilingStatus]
  const stateTaxBracket = STATE_CAPITAL_GAINS_TAX_BRACKETS[state]
  const federalTaxes = incomeTax({ annualIncome, taxBrackets: federalTaxBracket })
  const stateTaxes = incomeTax({ annualIncome, taxBrackets: stateTaxBracket })
  const netIncome = annualIncome - federalTaxes - stateTaxes
  return toDollarAmount(netIncome)
}

export const afterIncomeTaxIncome = ({ annualIncome, state, taxFilingStatus }) => {
  const federalTaxBracket = FEDERAL_INCOME_TAX_BRACKETS[taxFilingStatus]
  const stateTaxBracket = STATE_INCOME_TAX_BRACKETS[state]
  const federalTaxes = incomeTax({ annualIncome, taxBrackets: federalTaxBracket })
  const stateTaxes = incomeTax({ annualIncome, taxBrackets: stateTaxBracket })
  const otherTaxes = socialSecurityAndMedicareTax(annualIncome)
  const netIncome = annualIncome - federalTaxes - stateTaxes - otherTaxes
  return toDollarAmount(netIncome)
}

export const beforeCapitalGainsTaxRetirementIncome = (props) => {
  const capitalGainsTaxProps = {
    afterTaxIncomeFn: afterCapitalGainsIncome,
    annualIncome: props.retirementIncome,
    upperBoundTaxMultiplier: UPPER_BOUND_CAPITAL_GAINS_TAX_MULTIPLIER,
  }

  return beforeTaxRetirementIncome(merge({}, props, capitalGainsTaxProps))
}

export const beforeIncomeTaxRetirementIncome = (props) => {
  const incomeTaxProps = {
    afterTaxIncomeFn: afterIncomeTaxIncome,
    state: props.retirementState,
    upperBoundTaxMultiplier: UPPER_BOUND_INCOME_TAX_MULTIPLIER,
  }

  return beforeTaxRetirementIncome(merge({}, props, incomeTaxProps))
}

export const beforeTaxRetirementIncome = ({
  afterTaxIncomeFn,
  annualIncome,
  incomeLowerBound,
  incomeUpperBound,
  state,
  taxFilingStatus,
  upperBoundTaxMultiplier,
}) => {
  incomeLowerBound = toDollarAmount(incomeLowerBound) ||
    toDollarAmount(annualIncome)
  incomeUpperBound = toDollarAmount(incomeUpperBound) ||
    toDollarAmount(annualIncome / (1 - upperBoundTaxMultiplier))

  const midpointIncome = toDollarAmount((incomeLowerBound + incomeUpperBound) / 2)
  const props = { annualIncome: midpointIncome, state, taxFilingStatus }
  const newAfterTaxIncome = afterTaxIncomeFn(props)

  if (toDollarAmount(incomeUpperBound - .01) <= incomeLowerBound &&
      incomeLowerBound <= incomeUpperBound) {
    return toDollarAmount(incomeUpperBound)
  } else if (newAfterTaxIncome >= annualIncome) {
    return beforeIncomeTaxRetirementIncome(merge(props, {
      annualIncome,
      incomeLowerBound,
      incomeUpperBound: midpointIncome
    }))
  } else {
    return beforeIncomeTaxRetirementIncome(merge(props, {
      annualIncome,
      incomeLowerBound: midpointIncome,
      incomeUpperBound
    }))
  }
}

export const combinedTaxPercentage = (annualIncome, afterTaxIncome) => (
  Number(parseFloat(100 * (1 - afterTaxIncome / annualIncome)).toFixed(1))
)

export const iraContributionLimit = ({ annualIncome, currentAge }) => {
  const maxAnnualIRAContribution = currentAge >= 50 ? 6500 : 5500
  return min([maxAnnualIRAContribution, Number(annualIncome)])
}

export const toDollarAmount = (number) => Number(parseFloat(number).toFixed(2))

export const traditionalIRATaxDeduction = ({
  annualIncome,
  iraContribution,
  has401k,
  spouseHas401k,
  taxFilingStatus,
}) => {
  let incomeLimit = TRADITIONAL_IRA_DEDUCTION_INCOME_LIMITS
                        .has401k[has401k][taxFilingStatus]

  if (incomeLimit !== null && 'object' === typeof incomeLimit) {
    incomeLimit = incomeLimit.spouseHas401k[spouseHas401k]
  }

  if (incomeLimit === null || annualIncome <= incomeLimit) {
    return iraContribution
  } else {
    return 0
  } 
}

export const traditionalIRATaxRefund = (props) => {
  const { annualIncome, state, taxFilingStatus } = props
  const iraDeduction = traditionalIRATaxDeduction(props)
  const afterTaxIncomeWithoutDeduction = afterIncomeTaxIncome(props)
  const afterTaxIncomeWithDeduction = afterIncomeTaxIncome({
    annualIncome: annualIncome - iraDeduction,
    state,
    taxFilingStatus,
  })

  return afterTaxIncomeWithoutDeduction - afterTaxIncomeWithDeduction
}

export const traditionalIRAWithdrawal = (props) => {
  const beforeTaxRetirementIncomeProps =
    merge({}, props, { annualIncome: props.retirementIncome })
  return beforeIncomeTaxRetirementIncome(beforeTaxRetirementIncomeProps)
}

export const yearsOfRetirementIncome = ({ accountBalance, retirementIncome }) => {
  const MAX_YEARS = 1000
  let balance = accountBalance
  let years = 0
  while (balance >= retirementIncome && years < MAX_YEARS) {
    balance -= retirementIncome
    balance *= 1 + ANNUAL_ROI_MULTIPLIER
    years++
  }

  if (years === MAX_YEARS) {
    return Number.POSITIVE_INFINITY || Infinity
  } else return years += (balance / retirementIncome)
}
