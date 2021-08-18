import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

function nextTut(sts){
  sts(prev=>{return prev+1})
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

function updateTimeH(value, setParams){
  let target = new Date()
  
  setParams(prev=>{
    return{
      ...prev,
      timeHorizon: Number(value)
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

function InputOne(props){
  return(
    <div>
      Let's set your first financial goal!
      Give it a name:
      <input type="text" onChange={(e)=>updateTitle(e.target.value, props.setTutParams)}/>
      <Button onClick={()=>nextTut(props.setTutSec)}>Next</Button>
      <p>{props.tutParams.title}</p>
    </div>
  )
}

function InputTwo(props){
  return(
    <div>
      How much do you need to save to reach this goal?
      <input type="number" onChange={(e)=>updateTarget(e.target.value, props.setTutParams)}/>
      <Button onClick={()=>nextTut(props.setTutSec)}>Next</Button>
    </div>
  )
}

function InputThree(props){
  return(
    <div>
      How many years from now would you like to reach this goal?
      <input type="number" onChange={(e)=>updateTimeH(e.target.value, props.setTutParams)}/>
      <Button onClick={()=>nextTut(props.setTutSec)}>Next</Button>
    </div>
  )
}

function InputFour(props){
  return(
    <div>
      How much have you saved up so far?
      <input type="number" onChange={(e)=>updateCurrent(e.target.value, props.setTutParams)}/>
      <Button onClick={()=>nextTut(props.setTutSec)}>Next</Button>
    </div>
  )
}

function InputFive(props){
  return(
    <div>
      In order to help you reach your goal faster, you want your savings to be invested.
      What level of risk are you willing to take?
      <select onChange={(e)=>updateRisk(e.target.value, props.setTutParams)}>
        <option value="1">Low</option>
        <option value="2">Low to Medium</option>
        <option value="3">Medium</option>
        <option value="4">Medium to High</option>
        <option value="5">High</option>
      </select>
      <Button onClick={()=>nextTut(props.setTutSec)}>Next</Button>
    </div>
  )
}

export {InputOne, InputTwo, InputThree, InputFour, InputFive}