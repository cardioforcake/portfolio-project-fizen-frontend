import { useState, useEffect } from "react"
import { Button, Slider, Input, Select } from '@material-ui/core';
import {updateProgress, nextTut, updateTitle, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, changeCSP, updateCSP} from '../../../../utils/update-functions.js'
import {calcCSP, calcProgress, calcNewCSP} from '../../../../utils/calc-functions.js'
import { getAllGoals, updateGoal } from '../../../../utils/goals-api';
import styles from './GoalDetails.module.css'

function GoalDetails(props){
  const [goalParams, setGoalParams]= useState({
    title: '',
    targetAmount: 0,
    targetDate: new Date(),
    currentAmount: 0,
    riskTolerance: 1,
    cspAmount: 0,
  })
  const [goalProgress, setGoalProgress] = useState(1)
  let monthIdx=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  useEffect(()=>{
    setGoalParams({
      title: props.goal.title,
      targetAmount: props.goal.targetAmount,
      targetDate: new Date(props.goal.targetDate),
      currentAmount: props.goal.currentAmount,
      riskTolerance: props.goal.riskTolerance,
      cspAmount: props.goal.cspAmount,
    })
    setGoalProgress(props.goal.progress)
  },[])

  async function syncGoal() {
    // FIXME I am not proud of this
    const goalPayload = { ...props.goal, ...goalParams, progress: goalProgress };

    // FIXME handle message
    let { goal, message } = await updateGoal(goalPayload);

    if (goal) {
      props.loadGoals();
    }
  }

  useEffect(()=>{
    if(calcProgress(goalParams) !== goalProgress.progress){
      setGoalProgress(calcProgress(goalParams))
    }
  },[goalParams])

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
      Title: <Input type="text" value={goalParams.title} onChange={(e)=>{updateTitle(e.target.value, setGoalParams)}}/>
      CSP: <Input type="number" value={goalParams.cspAmount} onChange={(e)=>{changeCSP(e.target.value, setGoalParams)}}/>
      Target: <Input type="number" value={goalParams.targetAmount} onChange={(e)=>{updateTarget(e.target.value, setGoalParams)}}/>
      Time: <Select value={monthIdx[goalParams.targetDate.getMonth()]} onChange={(e)=>updateTimeM(e.target.value, setGoalParams)}>
              {monthOptions}
            </Select>
            <Select value={goalParams.targetDate.getFullYear()} onChange={(e)=>updateTimeY(e.target.value, setGoalParams)}>
              {yearOptions}
            </Select>
      Current Balance: <Input type="number" value={goalParams.currentAmount} onChange={(e)=>updateCurrent(e.target.value, setGoalParams)}/>
      Risk Tolerance: <Select value={goalParams.riskTolerance} onChange={(e)=>updateRisk(e.target.value, setGoalParams)}>
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
          key={`${goalProgress}`}
          orientation="vertical"
          defaultValue={goalProgress}
          onChangeCommitted={(e, value)=>{updateProgress(value, setGoalProgress, goalParams, setGoalParams)}}
        />
      </div>
      <Button variant="contained" color="default" onClick={()=>props.setGoalSelect(null)}>Back</Button>
      <Button variant="contained" color="secondary" onClick={()=>syncGoal()}>Save</Button>
    </div>
  )
}

export default GoalDetails
