import merge from 'lodash/merge'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toDollarString } from '../../util/form_helpers'
import {
  accountBalanceAtRetirement,
  beforeCapitalGainsTaxRetirementIncome,
  traditionalIRATaxRefund,
  traditionalIRAWithdrawal,
  yearsOfRetirementIncome,
} from '../../util/tax_calculations'

const AccountSummaryTable = (props) => {
  const iraAccountBalance = accountBalanceAtRetirement(props)
  const taxRefund = traditionalIRATaxRefund(props)
  const iraProps = { accountBalance: iraAccountBalance }
  const rothIRAYears = yearsOfRetirementIncome(merge(iraProps, props))
  const tradIRAProps =
    merge({}, iraProps, { retirementIncome: traditionalIRAWithdrawal(props) })
  const tradIRAYears = yearsOfRetirementIncome(tradIRAProps)
  const nonIRAFirstWithdrawalAge =
    Number(props.retirementAge) + (tradIRAYears === Infinity ? 0 : tradIRAYears)
  const nonIRAAccountProps = merge({}, props, {
    contribution: taxRefund,
    retirementAge: nonIRAFirstWithdrawalAge,
  })
  const nonIRABalance = accountBalanceAtRetirement(nonIRAAccountProps)
  const nonIRAWithdrawalProps = merge({}, {
    accountBalance: nonIRABalance,
    retirementIncome: beforeCapitalGainsTaxRetirementIncome(props),
  })
  const nonIRAYears = yearsOfRetirementIncome(nonIRAWithdrawalProps)

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>IRA Choice</th>
          <th>Annual IRA Contribution Tax Refund</th>
          <th>IRA Account Balance at Retirement</th>
          <th>
            {
              nonIRAFirstWithdrawalAge == props.retirementAge ?
                'Non-IRA Account Balance at Retirement'
              : `Non-IRA Account Balance at Age 
                ${Math.floor(nonIRAFirstWithdrawalAge)}, on First Withdrawal`
            }
          </th>
          <th>Total Years of Retirement Income</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Roth IRA</th>
          <td>N/A</td>
          <td>{toDollarString(iraAccountBalance)}</td>
          <td>N/A</td>
          <td>{rothIRAYears.toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">Traditional IRA</th>
          <td>{toDollarString(taxRefund)}</td>
          <td>{toDollarString(iraAccountBalance)}</td>
          <td>{toDollarString(nonIRABalance)}</td>
          <td>{(tradIRAYears + nonIRAYears).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default AccountSummaryTable
