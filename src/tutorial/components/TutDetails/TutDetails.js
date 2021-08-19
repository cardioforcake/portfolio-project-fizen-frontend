import { Button, Slider, Input, Select } from '@material-ui/core';
import {updateProgress, nextTut, updateTitle, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, changeCSP, updateCSP} from '../../utils/update-functions.js'
import {calcCSP, calcProgress, calcNewCSP} from '../../utils/calc-functions.js'
import styles from './TutDetails.module.css'
import { useEffect, useState } from 'react';

function TutDetails(props){
  let monthIdx=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  useEffect(function(){
    if(calcProgress(props.tutParams) !== props.tutProgress){
      props.setTutProgress(calcProgress(props.tutParams))
    }
  },[props.tutParams])

  let today = new Date()
  let yearOptions = []
  for(let i=0; i<76; i++){
    yearOptions.push(<option value={`${today.getFullYear()+i}`} key={i}>{today.getFullYear()+i}</option>)
  }
  let monthOptions = []
  for(let i=0; i< 12; i++ ){
    monthOptions.push(<option value={monthIdx[i]} key={i}>{monthIdx[i]}</option>)
  }

  return(
    <div>
      Title: <Input type="text" value={props.tutParams.title} onChange={(e)=>{updateTitle(e.target.value, props.setTutParams)}}/>
      CSP: <Input type="number" value={props.tutParams.cspAmount} onChange={(e)=>{changeCSP(e.target.value, props.setTutParams)}}/>
      Target: <Input type="number" value={props.tutParams.targetAmount} onChange={(e)=>{updateTarget(e.target.value, props.setTutParams)}}/>
      Time: <Select value={monthIdx[props.tutParams.targetDate.getMonth()]} onChange={(e)=>updateTimeM(e.target.value, props.setTutParams)}>
              {monthOptions}
            </Select>
            <Select value={props.tutParams.targetDate.getFullYear()} onChange={(e)=>updateTimeY(e.target.value, props.setTutParams)}>
              {yearOptions}
            </Select>
      Current Balance: <Input type="number" value={props.tutParams.currentAmount} onChange={(e)=>updateCurrent(e.target.value, props.setTutParams)}/>
      Risk Tolerance: <Select value={props.tutParams.riskTolerance} onChange={(e)=>updateRisk(e.target.value, props.setTutParams)}>
                        <option value="1">Low</option>
                        <option value="2">Low to Medium</option>
                        <option value="3">Medium</option>
                        <option value="4">Medium to High</option>
                        <option value="5">High</option>
                      </Select>
      <div className={styles.progressBar}>
        <Slider
          min={0.5}
          max={1.5}
          step={0.01}
          key={`${props.tutProgress}`}
          orientation="vertical"
          defaultValue={props.tutProgress}
          onChangeCommitted={(e, value)=>{updateProgress(value, props.setTutProgress, props.tutParams, props.setTutParams)}}
        />
      </div>
      <Button onClick={()=>{nextTut(props.setTutSec); updateCSP(props.tutParams, props.setTutParams)}}>Register & Save</Button>
    </div>
  )
}

export default TutDetails