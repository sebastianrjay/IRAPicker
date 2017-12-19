import min from 'lodash/min'
import {
  FEDERAL_INCOME_TAX_BRACKETS,
  STATE_INCOME_TAX_BRACKETS,
} from '../constants/tax_data'

export const combinedContributionLimit = ({
  annualIncome,
  currentAge,
}) => {
  const maxAnnualIRAContribution = currentAge >= 50 ? 6500 : 5500
  return min([maxAnnualIRAContribution, Number(annualIncome)])
}

const tax = ({ annualIncome, taxBrackets }) => {
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

const afterTaxIncome = ({ annualIncome, state, taxFilingStatus }) => {
  const federalTaxBracket = FEDERAL_INCOME_TAX_BRACKETS[taxFilingStatus]
  const federalTaxes = tax({ annualIncome, taxBrackets: federalTaxBracket })
  const stateTaxBracket = STATE_INCOME_TAX_BRACKETS[state]
  const stateTaxes = tax({ annualIncome, taxBrackets: stateTaxBracket })
  return annualIncome - federalTaxes - stateTaxes
}

export const extraInvestmentFromDeduction = ({
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
