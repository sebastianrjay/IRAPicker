import merge from 'lodash/merge'
import React from 'react'
import { connect } from 'react-redux'
import { toDollarString } from '../../util/page_helpers'
import {
  accountBalanceAtRetirement,
  beforeCapitalGainsTaxRetirementIncome,
  nonIRAFirstWithdrawalAge,
  traditionalIRATaxRefund,
  traditionalIRAWithdrawal,
  yearsOfRetirementIncome,
} from '../../util/tax_calculations'

const AccountSummaryTable = (props) => {
  console.log('AccountSummaryTable retirementTaxFilingStatus', props.retirementTaxFilingStatus)
  const iraAccountBalance = accountBalanceAtRetirement(props)
  const taxRefund = traditionalIRATaxRefund(props)
  const iraProps = { accountBalance: iraAccountBalance }
  const rothIRAYears = yearsOfRetirementIncome(merge(iraProps, props))
  const tradIRAProps =
    merge({}, iraProps, { retirementIncome: traditionalIRAWithdrawal(props) })
  const tradIRAYears = yearsOfRetirementIncome(tradIRAProps)
  const nonIRAWithdrawalAge=
    nonIRAFirstWithdrawalAge(props.retirementAge, taxRefund, tradIRAYears)
  const nonIRAAccountProps = merge({}, props, {
    contribution: taxRefund,
    iraContribution: 0,
    retirementAge: nonIRAWithdrawalAge
  })
  const nonIRABalance = accountBalanceAtRetirement(nonIRAAccountProps)
  const nonIRAWithdrawalProps = merge({}, {
    accountBalance: nonIRABalance,
    retirementIncome: beforeCapitalGainsTaxRetirementIncome(props),
  })
  const nonIRAYears = yearsOfRetirementIncome(nonIRAWithdrawalProps)
  const winner = rothIRAYears > tradIRAYears + nonIRAYears ? 'roth' : 'trad'

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>IRA Choice</th>
            <th>Total Years of Retirement Income</th>
            <th>Annual IRA Contribution Tax Refund</th>
            <th>IRA Account Balance at Retirement</th>
            <th>
              {
                nonIRAWithdrawalAge == props.retirementAge ?
                  'Non-IRA Account Balance at Retirement'
                : `Non-IRA Account Balance at Age 
                  ${Math.floor(nonIRAWithdrawalAge)},on First Withdrawal`
              }
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={winner === 'roth' ? 'table-success' : null}>
            <th scope="row">Roth IRA</th>
            <td>{rothIRAYears.toFixed(2)}</td>
            <td>N/A*</td>
            <td>{toDollarString(iraAccountBalance)}</td>
            <td>N/A*</td>
          </tr>
          <tr className={winner === 'trad' ? 'table-success' : null}>
            <th scope="row">Traditional IRA</th>
            <td>{(tradIRAYears + nonIRAYears).toFixed(2)}</td>
            <td>{toDollarString(taxRefund)}</td>
            <td>{toDollarString(iraAccountBalance)}</td>
            <td>{toDollarString(nonIRABalance)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AccountSummaryTable
