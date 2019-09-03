import merge from 'lodash/merge'
import React from 'react'
import { connect } from 'react-redux'
import FootnoteLink from './footnote_link'
import { toDollarString } from '../../util/page_helpers'
import {
  accountBalanceAtRetirement,
  beforeCapitalGainsTaxRetirementIncome,
  nonIRAFirstWithdrawalAge,
  traditionalIRATaxRefund,
  traditionalIRAWithdrawal,
  yearsOfRetirementIncome,
} from '../../util/tax_calculations'
import {
  ROTH_IRA_BACKDOOR_URL,
  ROTH_IRA_LIMITS_URL,
  TRADITIONAL_IRA_DEDUCTION_LIMITS_URL,
} from '../../constants/external_links'
import { ROTH_IRA_PHASE_OUT_INCOME } from '../../constants/tax_data'

const AccountSummaryTable = (props) => {
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
  const winner = rothIRAYears > tradIRAYears + nonIRAYears ? 'Roth' : 'Traditional'

  return (
    <div>
      <p>
        Investing in a <span className="font-weight-bold">{winner} IRA
        </span> will give you the most retirement income under 2018 tax rates,
        based on your current income, location, tax filing status and retirement
        plans.
        {
          winner === 'Roth' && props.annualIncome > ROTH_IRA_PHASE_OUT_INCOME
            ? <span>&nbsp;Because your income is above&nbsp;
              {toDollarString(ROTH_IRA_PHASE_OUT_INCOME)}, you may need a&nbsp;
              <a href={ROTH_IRA_BACKDOOR_URL} target="_blank">backdoor Roth 
              IRA</a> in order to avoid <a
                href={ROTH_IRA_LIMITS_URL}
                target="_blank"
              >Roth IRA contribution limits</a>.</span>
            : null
        }
        {
          taxRefund === 0 ?
            <span>
              &nbsp;You are ineligible for a traditional IRA tax deduction (and 
              tax refund) because your annual Modified Adjusted Gross Income 
              is <a href={TRADITIONAL_IRA_DEDUCTION_LIMITS_URL} target="_blank">
              too high</a>.
            </span>
          : null
        }
      </p>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>IRA Choice</th>
              <th>Total Years of Retirement Income</th>
              <th>Annual IRA Contribution Tax Refund</th>
              <th>IRA Account Balance at Retirement<FootnoteLink to={1}/></th>
              <th>
                {
                  nonIRAWithdrawalAge == props.retirementAge ?
                    'Non-IRA Account Balance at Retirement'
                  : `Non-IRA Account Balance at Age 
                    ${Math.floor(nonIRAWithdrawalAge)}, on First Withdrawal`
                }<FootnoteLink to={1}/>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={winner === 'Roth' ? 'table-success' : null}>
              <th scope="row">Roth IRA</th>
              <td>{rothIRAYears.toFixed(2)}<FootnoteLink to={2}/></td>
              <td>N/A<FootnoteLink to={3}/></td>
              <td>{toDollarString(iraAccountBalance)}</td>
              <td>N/A<FootnoteLink to={3}/></td>
            </tr>
            <tr className={winner === 'Traditional' ? 'table-success' : null}>
              <th scope="row">Traditional IRA</th>
              <td>
                {(tradIRAYears + nonIRAYears).toFixed(2)}<FootnoteLink to={2}/>
              </td>
              <td>{toDollarString(taxRefund)}</td>
              <td>{toDollarString(iraAccountBalance)}</td>
              <td>{toDollarString(nonIRABalance)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AccountSummaryTable
