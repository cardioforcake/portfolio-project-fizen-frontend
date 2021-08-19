import { Button } from '@material-ui/core';
import {nextTut, updateTitle, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, updateCSP} from '../../utils/update-functions.js'
import {calcCSP} from '../../utils/calc-functions.js'

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
  let daysInMonth = [31, 28, 31,]
  let today = new Date()
  let yearOptions = []
  for(let i=0; i<76; i++){
    yearOptions.push(<option value={`${today.getFullYear()+i}`} key={i}>{today.getFullYear()+i}</option>)
  }
  let monthOptions = []
  for(let i=0; i< 12; i++ ){
    monthOptions.push(<option value={`${i}`} key={i}>{i}</option>)
  }
  return(
    <div>
      How many years from now would you like to reach this goal?
      <select onChange={(e)=>updateTimeY(e.target.value, props.setTutParams)}>
        {yearOptions}
      </select>
      <select onChange={(e)=>updateTimeM(e.target.value, props.setTutParams)}>
        {monthOptions}
      </select>
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
      <Button onClick={()=>{nextTut(props.setTutSec); updateCSP(props.tutParams, props.setTutParams)}}>Next</Button>
    </div>
  )
}

export {InputOne, InputTwo, InputThree, InputFour, InputFive}