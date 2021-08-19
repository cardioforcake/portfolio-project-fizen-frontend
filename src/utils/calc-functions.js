function calcCSP(params){
  let rates = [0, 0.02, 0.04, 0.06, 0.075, 0.095]
  let today = new Date()
  let timeHorizonYrs = Math.abs(params.targetDate - today)*12/(1000*60*60*24*365.25)
  let compoundI = Math.pow((1+ (rates[params.riskTolerance]/12)), (timeHorizonYrs))
  let fValueCurr = params.currentAmount * compoundI
  let cspAmount = Math.ceil((params.targetAmount - fValueCurr) / (((compoundI-1)/(rates[params.riskTolerance]/12))*(1+(rates[params.riskTolerance]/12))))
  return cspAmount
}

function calcProgress(params){
  let rates = [0, 0.02, 0.04, 0.06, 0.075, 0.095]
  let today = new Date()
  let timeHorizonYrs = Math.abs(params.targetDate - today)*12/(1000*60*60*24*365.25).toFixed(2)
  let compoundI = Math.pow((1+ (rates[params.riskTolerance]/12)), (timeHorizonYrs))
  let fValueCSP = params.cspAmount*((compoundI-1)/(rates[params.riskTolerance]/12))*(1+(rates[params.riskTolerance]/12))
  let fValueCurr = params.currentAmount * compoundI
  return ((fValueCSP + fValueCurr)/params.targetAmount).toFixed(3)
}

function calcNewCSP(params, progress){
  let rates = [0, 0.02, 0.04, 0.06, 0.075, 0.095]
  let today = new Date()
  let timeHorizonYrs = Math.abs(params.targetDate - today)*12/(1000*60*60*24*365.25).toFixed(2)
  let compoundI = Math.pow((1+ (rates[params.riskTolerance]/12)), (timeHorizonYrs))
  let fValueCurr = params.currentAmount * compoundI
  let requiredFVCSP = progress*params.targetAmount - fValueCurr
  let pValueCSP = Math.ceil(requiredFVCSP/((compoundI-1)/(rates[params.riskTolerance]/12))*(1+(rates[params.riskTolerance]/12)))

  return pValueCSP
}

export {calcCSP, calcProgress, calcNewCSP}