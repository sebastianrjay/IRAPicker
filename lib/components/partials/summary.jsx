import merge from 'lodash/merge'
import omit from 'lodash/omit'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toDollarString } from '../../util/form_helpers'
import {
  accountBalanceAtRetirement,
  afterTaxIncome,
  beforeTaxIncome,
  traditionalIRATaxDeduction,
  traditionalIRATaxRefund,
} from '../../util/tax_calculations'

const Summary = (props) => {
  if (!props.annualIncome || !props.retirementIncome) return null

  const iraTaxDeduction = traditionalIRATaxDeduction(props)
  const iraTaxRefund = traditionalIRATaxRefund(props)
  const beforeTaxIncomeProps =
    merge({ annualIncome: props.retirementIncome }, omit(props, ['annualIncome']))
  const traditionalIRAWithdrawal = beforeTaxIncome(beforeTaxIncomeProps)
  const rothTotalSavings = accountBalanceAtRetirement(props)
  const traditionalIRATotalSavings = 
    accountBalanceAtRetirement(merge({ iraTaxRefund }, props))

  return (
    <div className="row">
      <div className="col-md-12">
        <p>
          {
            `With your current income, location and tax filing status, your 
            tax deduction is ${toDollarString(iraTaxDeduction)} and your tax 
            refund is ${toDollarString(iraTaxRefund)}, granted annually from any 
            traditional IRA contributions. Roth IRA contributions are not 
            tax-deductible and therefore never yield a tax refund. Traditional 
            IRA withdrawals during retirement are taxed like regular income. 
            This calculation assumes that you reinvest your traditional IRA tax 
            refunds in non-IRA accounts, so that your annual after-tax income 
            before retirement is the same regardless if you contribute to a Roth 
            or traditional IRA.`
          }
        </p>
        <p>
          {
            `If you continue annually investing $${props.combinedContribution} 
            in one IRA account and investing all tax refunds from traditional 
            IRA contributions in other assets, your IRA account balance will 
            be one of the following when you retire:`
          }
        </p>
        <p>{`Roth IRA: ${toDollarString(rothTotalSavings)}`}</p>
        <p>{`Traditional IRA: ${toDollarString(traditionalIRATotalSavings)}`}</p>
        <p>
          {
            `To earn a post-tax retirement income of 
            ${toDollarString(props.retirementIncome)}, you will need to annually 
            withdraw ${toDollarString(props.retirementIncome)} from your Roth 
            IRA, or ${toDollarString(traditionalIRAWithdrawal)} from your 
            traditional IRA and other non-tax advantaged retirement accounts.`
          }
        </p>
      </div>
    </div>
  )
}

export default Summary
