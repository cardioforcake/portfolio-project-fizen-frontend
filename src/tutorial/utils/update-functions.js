import {calcCSP} from './calc-functions.js'

function nextTut(setSection){
  setSection(prev=>{return prev+1})
}

function updateTitle(value, setParams){
  setParams(prev=>{
    return{
      ...prev,
      title: value
    }
  })
}

function updateTarget(value, setParams){
  setParams(prev=>{
    return{
      ...prev,
      targetAmount: Number(value)
    }
  })
}

function updateTimeY(value, setParams){
  setParams(prev=>{
    let newDate = new Date(prev.targetDate)
    newDate.setYear(Number(value))
    return{
      ...prev,
      targetDate: newDate
    }
  })
}

function updateTimeM(value, setParams){
  setParams(prev=>{
    let newDate = new Date(prev.targetDate)
    newDate.setMonth(Number(value))
    return{
      ...prev,
      targetDate: newDate
    }
  })
}

function updateCurrent(value, setParams){
  setParams(prev=>{
    return{
      ...prev,
      currentAmount: Number(value)
    }
  })
}

function updateRisk(value, setParams){
  setParams(prev=>{
    return{
      ...prev,
      riskTolerance: Number(value)
    }
  })
}

function updateCSP(params, setParams){
  let csp = calcCSP(params)
  setParams(prev=>{
    return{
      ...prev,
      cspAmount: csp
    }
  })
}

export {nextTut, updateTitle, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, updateCSP}