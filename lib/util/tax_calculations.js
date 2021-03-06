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

const getStateTaxBrackets = (taxType, state, taxFilingStatus) => {
  const brackets = taxType === 'capital' ? 
    STATE_CAPITAL_GAINS_TAX_BRACKETS 
    : STATE_INCOME_TAX_BRACKETS

  return brackets[state][taxFilingStatus] || brackets[state]
}

const incomeTax = ({ annualIncome, taxBrackets }) => {
  let incomeRemaining = annualIncome
  const descendingTaxBrackets = Object.keys(taxBrackets).reverse()
  return descendingTaxBrackets.reduce((taxTotal, bracketIncomeFloor) => {
    let taxedIncome = incomeRemaining - bracketIncomeFloor
    if (taxedIncome <= 0) return taxTotal
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
  const stateTaxBracket = getStateTaxBrackets('capital', state, taxFilingStatus)
  const federalTaxes = incomeTax({ annualIncome, taxBrackets: federalTaxBracket })
  const stateTaxes = incomeTax({ annualIncome, taxBrackets: stateTaxBracket })
  const netIncome = annualIncome - federalTaxes - stateTaxes
  return toDollarAmount(netIncome)
}

export const afterIncomeTaxIncome = ({ annualIncome, state, taxFilingStatus }) => {
  const federalTaxBracket = FEDERAL_INCOME_TAX_BRACKETS[taxFilingStatus]
  const stateTaxBracket = getStateTaxBrackets('income', state, taxFilingStatus)
  const federalTaxes = incomeTax({ annualIncome, taxBrackets: federalTaxBracket })
  const stateTaxes = incomeTax({ annualIncome, taxBrackets: stateTaxBracket })
  const otherTaxes = socialSecurityAndMedicareTax(annualIncome)
  const netIncome = annualIncome - federalTaxes - stateTaxes - otherTaxes
  return toDollarAmount(netIncome)
}

export const beforeCapitalGainsTaxRetirementIncome = (props) => {
  const capitalGainsTaxProps = {
    afterTaxIncomeFn: afterCapitalGainsIncome,
    upperBoundTaxMultiplier: UPPER_BOUND_CAPITAL_GAINS_TAX_MULTIPLIER,
  }

  return beforeTaxRetirementIncome(merge({}, props, capitalGainsTaxProps))
}

export const beforeIncomeTaxRetirementIncome = (props) => {
  const incomeTaxProps = {
    afterTaxIncomeFn: afterIncomeTaxIncome,
    upperBoundTaxMultiplier: UPPER_BOUND_INCOME_TAX_MULTIPLIER,
  }

  return beforeTaxRetirementIncome(merge({}, props, incomeTaxProps))
}

export const beforeTaxRetirementIncome = (props) => {
  let {
    afterTaxIncomeFn,
    incomeLowerBound,
    incomeUpperBound,
    retirementIncome,
    retirementState,
    retirementTaxFilingStatus,
    upperBoundTaxMultiplier,
  } = props
  incomeLowerBound = toDollarAmount(incomeLowerBound) ||
    toDollarAmount(retirementIncome)
  incomeUpperBound = toDollarAmount(incomeUpperBound) ||
    toDollarAmount(retirementIncome / (1 - upperBoundTaxMultiplier))

  const midpointIncome = toDollarAmount((incomeLowerBound + incomeUpperBound) / 2)
  const newAfterTaxIncome = afterTaxIncomeFn({
    annualIncome: midpointIncome,
    state: retirementState,
    taxFilingStatus: retirementTaxFilingStatus,
  })

  if (toDollarAmount(newAfterTaxIncome - .01) <= retirementIncome &&
      retirementIncome <= toDollarAmount(newAfterTaxIncome)) {
    return toDollarAmount(midpointIncome)
  } else if (newAfterTaxIncome > retirementIncome) {
    return beforeTaxRetirementIncome(merge({}, props, {
      incomeLowerBound,
      incomeUpperBound: midpointIncome,
    }))
  } else {
    return beforeTaxRetirementIncome(merge({}, props, {
      incomeLowerBound: midpointIncome,
      incomeUpperBound,
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

export const nonIRAFirstWithdrawalAge = (retirementAge, taxRefund, tradIRAYears) => (
  Number(retirementAge) + (!taxRefund || tradIRAYears === Infinity ? 0 : tradIRAYears)
)

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
