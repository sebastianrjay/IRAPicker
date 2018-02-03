import at from 'lodash/at'
import merge from 'lodash/merge'

export const mapSummaryStateToProps = (state, _ownProps) => {
  const formDataObjects = at(state, [
    'form.currentTaxes.values',
    'form.investmentPlan.values',
    'form.retirementTaxes.values',
  ])
  return merge({}, ...formDataObjects)
}

export const toDollarString = (number) => (
  `$${parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`
)
