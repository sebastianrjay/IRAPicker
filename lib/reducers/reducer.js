import { combineReducers } from 'redux'
import currentTaxesReducer from './pages/current_taxes_reducer'
import investmentPlanReducer from './pages/investment_plan_reducer'
import retirementTaxesReducer from './pages/retirement_taxes_reducer'

const reducer = combineReducers({
  investmentPlan: investmentPlanReducer,
  currentTaxes: currentTaxesReducer,
  retirementTaxes: retirementTaxesReducer,
})

export default reducer
