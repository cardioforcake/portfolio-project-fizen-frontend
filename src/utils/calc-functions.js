const MILLISECONDS_IN_YEAR = 1000 * 60 * 60 * 24 * 365.25;
const RATES = [0, 0.02, 0.04, 0.06, 0.075, 0.095];

function compoundInterest(targetDate, riskTolerance) {
  const today = new Date();
  const timeHorizonYrs = Math.abs(targetDate - today) * 12 / MILLISECONDS_IN_YEAR;

  return Math.pow((1 + (RATES[riskTolerance] / 12)), timeHorizonYrs);
}

function calcCSP(params) {
  const compoundI = compoundInterest(params.targetDate, params.riskTolerance);

  const fValueCurr = params.currentAmount * compoundI;
  const cspAmount = Math.ceil(
    (params.targetAmount - fValueCurr) / (
      ((compoundI - 1) / (RATES[params.riskTolerance] / 12)) *
      (1 + (RATES[params.riskTolerance] / 12))
    )
  );

  return cspAmount;
}

function calcProgress(params) {
  const compoundI = compoundInterest(params.targetDate, params.riskTolerance);

  const fValueCSP =
    params.cspAmount *
    ((compoundI - 1) / (RATES[params.riskTolerance]/12)) *
    (1 + (RATES[params.riskTolerance] / 12));
  const fValueCurr = params.currentAmount * compoundI;

  return ((fValueCSP + fValueCurr)/params.targetAmount).toFixed(3);
}

function calcNewCSP(params, progress) {
  const compoundI = compoundInterest(params.targetDate, params.riskTolerance);

  const fValueCurr = params.currentAmount * compoundI;
  const requiredFVCSP = progress * params.targetAmount - fValueCurr;
  const pValueCSP = Math.ceil(
    requiredFVCSP /
    (
      ((compoundI - 1) / (RATES[params.riskTolerance] / 12)) *
      (1 + (RATES[params.riskTolerance] / 12))
    )
  );

  return pValueCSP;
}

export {calcCSP, calcProgress, calcNewCSP};
