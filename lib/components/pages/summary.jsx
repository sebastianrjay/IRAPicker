import React from 'react'
import { connect } from 'react-redux'
import AccountSummaryTable from '../partials/account_summary_table'
import FootnoteLink from '../partials/footnote_link'
import {
  mapAllFormStateToProps,
  toDollarString,
  toPercentage,
} from '../../util/page_helpers'
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
} from '../../constants/external_links'
import { ANNUAL_ROI_MULTIPLIER } from '../../constants/tax_data'
import { INTERCOM_APP_ID } from '../../../config/secrets'

const Summary = ({ formInput }) => {
  window.Intercom('boot', { app_id: INTERCOM_APP_ID })
  $('.intercom-launcher-frame').tooltip({ placement: 'left' })

  return (
    <div className="row mb-5">
      <div className="col-md-12">
        <AccountSummaryTable {...formInput}/>
        <p>
          <span className="font-weight-bold">Assumptions</span>
        </p>
        <ul>
          <li>
            You reinvest any traditional IRA tax refund in non-IRA accounts, so 
            that your annual disposable income before retirement is the same 
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
        </ul>
        <p>
          <span className="font-weight-bold">Explanation</span>
        </p>
        <p>
          The best IRA account for you is the one that yields the most years of 
          your desired after-tax retirement income.
        </p>
        <p>
          {
            `To earn a post-tax retirement income of 
            ${toDollarString(formInput.retirementIncome)} in 
            ${formInput.retirementState}, 
            you will need to annually withdraw 
            ${toDollarString(formInput.retirementIncome)} from your Roth IRA, 
            ${toDollarString(traditionalIRAWithdrawal(formInput))} from your 
            traditional IRA, or about 
            ${toDollarString(beforeCapitalGainsTaxRetirementIncome(formInput))} 
            from any non-tax advantaged retirement account on which capital gains 
            tax is payable.`
          }<FootnoteLink to={4}/>
        </p>
        <p>
          {
            `With your current income, location and tax filing status, your 
            annual traditional IRA tax deduction and tax refund are 
            ${toDollarString(traditionalIRATaxDeduction(formInput))} and 
            ${toDollarString(traditionalIRATaxRefund(formInput))}, respectively.`
          } Traditional IRA withdrawals <a
            target="_blank"
            href={TRADITIONAL_IRA_WITHDRAWAL_RULES_URL}
          > during retirement </a> are subject to standard income tax.
        </p>
        <p>
          <span className="font-weight-bold">Footnotes</span>
        </p>
        <p id="footnote-1" className="small">
          1. Account balances are calculated assuming   
          a {toPercentage(ANNUAL_ROI_MULTIPLIER)} average annual return on 
          investment (ROI).
        </p>
        <p id="footnote-2" className="small">
          2. It is possible to have Infinity (∞) years of retirement income if  
          your total annual account withdrawal amount is always less than or equal 
          to your total annual account balance growth.
        </p>
        <p id="footnote-3" className="small">
          3. Roth IRA contributions are not tax-deductible and therefore never 
          yield a tax refund.
        </p>
        <p id="footnote-4" className="small">
          4. If using a traditional IRA, it may be possible to extend your years  
          of income by simultaneously withdrawing money from your IRA and 
          non-IRA accounts, and withdrawing little enough annual income from 
          your non-IRA account that you pay no federal capital gains tax.
        </p>
      </div>
    </div>
  )
}

export default connect(mapAllFormStateToProps)(Summary)
