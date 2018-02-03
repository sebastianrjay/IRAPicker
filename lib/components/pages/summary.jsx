import React from 'react'
import { connect } from 'react-redux'
import { mapSummaryStateToProps, toDollarString } from '../../util/page_helpers'
import {
  beforeCapitalGainsTaxRetirementIncome,
  beforeIncomeTaxRetirementIncome,
  traditionalIRATaxDeduction,
  traditionalIRATaxRefund,
  traditionalIRAWithdrawal,
} from '../../util/tax_calculations'
import { MINIMUM_DISTRIBUTION_URL } from '../../constants/tax_data'
import AccountSummaryTable from '../partials/account_summary_table'

const Summary = (props) => {
  if (!props.annualIncome || !props.retirementIncome) return null

  return (
    <div className="row mb-5">
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
            `To earn a post-tax retirement income of 
            ${toDollarString(props.retirementIncome)}, you will need to annually 
            withdraw ${toDollarString(props.retirementIncome)} from your Roth 
            IRA, ${toDollarString(traditionalIRAWithdrawal(props))} from your 
            traditional IRA, or 
            ${toDollarString(beforeCapitalGainsTaxRetirementIncome(props))} 
            from any non-tax advantaged retirement account on which capital 
            gains tax is payable.`
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
          <span className="font-weight-bold">NOTE:</span> The best IRA account 
          for you is the one that gives you the most Total Years of Retirement 
          Income.
        </p>
        <p>
          These calculations assume that you will drain your traditional IRA 
          account before draining your non-IRA account, if using a traditional 
          IRA. The reason is that <a
            href={MINIMUM_DISTRIBUTION_URL}
            target="_blank"
          >minimum IRA distributions</a> are required starting at age 
          70<span className="small">1/2</span>. If using a traditional IRA, it 
          may be possible to extend your years of income by simultaneously 
          withdrawing money from your IRA and non-IRA accounts, and withdrawing 
          little enough annual income from your non-IRA account that you pay no 
          federal capital gains tax.
        </p>
      </div>
    </div>
  )
}

export default connect(mapSummaryStateToProps)(Summary)
