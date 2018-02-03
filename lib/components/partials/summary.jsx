import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toDollarString } from '../../util/form_helpers'
import {
  beforeIncomeTaxIncome,
  traditionalIRATaxDeduction,
  traditionalIRATaxRefund,
  traditionalIRAWithdrawal,
} from '../../util/tax_calculations'
import AccountSummaryTable from './account_summary_table.jsx'

const Summary = (props) => {
  if (!props.annualIncome || !props.retirementIncome) return null

  return (
    <div className="row">
      <div className="col-md-12">
        <p>
          {
            `With your current income, location and tax filing status, your 
            tax deduction is ${toDollarString(traditionalIRATaxDeduction(props))} 
            and your tax refund is 
            ${toDollarString(traditionalIRATaxRefund(props))}, granted annually 
            from any traditional IRA contributions. Roth IRA contributions are 
            not tax-deductible and therefore never yield a tax refund. 
            Traditional IRA withdrawals during retirement are taxed like regular 
            income. This calculation assumes that you reinvest your traditional 
            IRA tax refunds in non-IRA accounts, so that your annual after-tax 
            income before retirement is the same regardless if you contribute to 
            a Roth or traditional IRA.`
          }
        </p>
        <p>
          {
            `If you continue annually investing 
            ${toDollarString(props.iraContribution)} in one IRA account and 
            investing all tax refunds from traditional IRA contributions in other 
            assets, your account balances will be as follows when you retire:`
          }
        </p>
        <AccountSummaryTable {...props}/>
        <p>
          {
            `To earn a post-tax retirement income of 
            ${toDollarString(props.retirementIncome)}, you will need to annually 
            withdraw ${toDollarString(props.retirementIncome)} from your Roth 
            IRA, or ${toDollarString(traditionalIRAWithdrawal(props))} from your 
            traditional IRA and other non-tax advantaged retirement accounts.`
          }
        </p>
      </div>
    </div>
  )
}

export default Summary
