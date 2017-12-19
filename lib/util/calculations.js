import min from 'lodash/min'

export const combinedContributionLimit = ({
  annualIncome,
  currentAge,
}) => {
  const isFiftyPlus = currentAge >= 50
  annualIncome = Number(annualIncome)

  if (isFiftyPlus) {
    return min([6500, annualIncome])
  } else {
    return min([5500, annualIncome])
  }
}
