import merge from 'lodash/merge'
import omit from 'lodash/omit'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  accountBalanceAtRetirement,
  afterTaxIncome,
  beforeTaxIncome,
  taxRefundFromIRADeduction,
} from '../../util/tax_calculations'

const Summary = (props) => {
  if (!props.annualIncome || !props.retirementIncome) return null

  const iraTaxRefund = taxRefundFromIRADeduction(props)
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
            `If you continue annually investing $${props.combinedContribution} 
            in one IRA account and investing all tax refunds from traditional 
            IRA contributions in other assets, your IRA account balance will 
            be one of the following when you retire:`
          }
        </p>
        <p>{`Roth IRA: $${rothTotalSavings}`}</p>
        <p>{`Traditional IRA: $${traditionalIRATotalSavings}`}</p>
        <p>
          {
            `To earn a post-tax retirement income of $${props.retirementIncome}, 
            you will need to annually withdraw $${props.retirementIncome} from 
            your Roth IRA, or $${traditionalIRAWithdrawal} from your traditional 
            IRA.`
          }
        </p>
      </div>
    </div>
  )
}

export default Summary
