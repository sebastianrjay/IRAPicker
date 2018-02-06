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
import {
  MINIMUM_DISTRIBUTION_URL,
  TRADITIONAL_IRA_WITHDRAWAL_RULES_URL,
} from '../../constants/tax_data'
import AccountSummaryTable from '../partials/account_summary_table'

const Summary = (props) => {
  console.log('Summary retirementTaxFilingStatus', props.retirementTaxFilingStatus)
  if (!props.annualIncome || !props.retirementIncome) return null

  return (
    <div className="row mb-5">
      <div className="col-md-12">
        <AccountSummaryTable {...props}/>
        <p>
          <span className="font-weight-bold">NOTE:</span> The best IRA account 
          for you is the one that yields the most years of retirement income.
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
            gains tax is payable.**`
          }
        </p>
        <p>
          {
            `With your current income, location and tax filing status, your 
            annual traditional IRA tax deduction and tax refund are 
            ${toDollarString(traditionalIRATaxDeduction(props))} and 
            ${toDollarString(traditionalIRATaxRefund(props))}, respectively.`
          } Traditional IRA withdrawals <a
            target="_blank"
            href={TRADITIONAL_IRA_WITHDRAWAL_RULES_URL}
          > during retirement </a> are taxed like regular income.
        </p>
        <p>
          <span className="font-weight-bold">Assumptions:</span>
        </p>
        <ol className="mb-5">
          <li>
            You reinvest your traditional IRA tax refunds in non-IRA accounts, 
            so that your annual disposable income before retirement is the same 
            regardless if you contribute to a Roth or traditional IRA.
          </li>
          <li>
            You drain your traditional IRA before your non-IRA account, to 
            avoid <a
              href={MINIMUM_DISTRIBUTION_URL}
              target="_blank"
            >required minimum IRA distributions</a> starting at age 70
            <span className="small">1/2</span>.
          </li>
        </ol>
        <p className="small">
          *Roth IRA contributions are not tax-deductible and therefore never 
          yield a tax refund.
        </p>
        <p className="small">
          **If using a traditional IRA, it may be possible to extend your years  
          of income by simultaneously withdrawing money from your IRA and 
          non-IRA accounts, and withdrawing little enough annual income from 
          your non-IRA account that you pay no federal capital gains tax.
        </p>
      </div>
    </div>
  )
}

export default connect(mapSummaryStateToProps)(Summary)
