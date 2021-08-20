import { useState, useEffect } from "react"
import { Button, Slider, Input, Select, Grid, Typography,InputAdornment, InputBase } from '@material-ui/core';
import {updateProgress, nextTut, updateTitle, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, changeCSP, updateCSP} from '../../../../utils/update-functions.js'
import {calcCSP, calcProgress, calcNewCSP} from '../../../../utils/calc-functions.js'
import { getAllGoals, updateGoal } from '../../../../utils/goals-api';
import styles from './GoalDetails.module.css'
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  currentToGoal:{
    height: '50%',
    textAlign: 'center',
  },
  currentToGoalContainer:{
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  progressText:{
    color: '#356895',
    width: '4rem',
    margin: 'auto',
    fontWeight: '500'
  },
  progressBar:{
    height: '15rem'
  },
  targetLabel:{
    color: '#356895',
    fontSize: '0.8rem',
    fontWeight: '400'
  },
  currentLabel:{
    color: '#356895',
    fontSize: '1.2rem',
    fontWeight: '400'
  },
  currentAmount:{
    fontSize: '1.3rem',
    textAlign: 'center'
  },
  csp:{
    color: '#356895',
    fontSize: '1.2rem',
    fontWeight: '500',
    marginRight: '2rem'
  },
  cspContainer:{
    display: 'flex',
  },
  cspAmount:{
    fontSize: '1.2rem'
  }
}))

const marks = [
  {
    value: 0.6,
    label: 'Behind',
  },
  {
    value: 1,
    label: 'On Track',
  },
  {
    value: 1.4,
    label: 'Ahead',
  },
];

const ProgressSlider = withStyles({
  root: {
    color: 'black',

  },
  thumb:{
    marginLeft:'-4.5px !important',
    width: '1rem',
    // borderRadius: '0.2rem !important',
    height: '1rem',
    color: '#356895',
    border: '2px solid grey'
  },
  rail:{
    // backgroundImage:  'linear-gradient(.50turn, #f00, #00f)',
    width: '0.4rem !important',
    opacity: '1 !important',
    borderRadius: '0.5rem'

  },
  track:{
    // backgroundImage:  'linear-gradient(.50turn, #f00, #00f)',
    width: '0.4rem !important',
    borderRadius: '0.5rem'
  },
  markLabel:{
    marginLeft: -80,
  },
  markActive:{
    opacity: '0'
  }

})(Slider)


function GoalDetails(props){
  const classes = useStyles()

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
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <InputBase 
            type="text" 
            value={goalParams.title.toUpperCase()} 
            onChange={(e)=>{updateTitle(e.target.value, setGoalParams)}}
          />
        </Grid>
        <Grid item xs={12}>
            <Typography className={classes.progressText}>
              Progress
            </Typography>

        </Grid>
        <Grid item xs={6}>
          <div>
          <div className={classes.progressBar}>

            <ProgressSlider
              min={0.5}
              max={1.5}
              step={0.01}
              key={`${goalProgress}`}
              orientation="vertical"
              defaultValue={goalProgress}
              onChangeCommitted={(e, value)=>{updateProgress(value, setGoalProgress, goalParams, setGoalParams)}}
              marks={marks}
            />
          </div>
          </div>

        </Grid>
        <Grid item xs={6}>
          <div className={classes.currentToGoalContainer}>
            <div className={classes.currentToGoal}>
              <Typography className={classes.targetLabel}>
                Target Goal
              </Typography>
              <Input 
                type="number" 
                value={goalParams.targetAmount} 
                onChange={(e)=>{updateTarget(e.target.value, setGoalParams)}}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </div>
            <div className={classes.currentToGoal}>
              <Typography className={classes.currentLabel}>
                Current Balance
              </Typography>
              <Input
                type="number" 
                value={goalParams.currentAmount} 
                onChange={(e)=>updateCurrent(e.target.value, setGoalParams)}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                className={classes.cspAmount}
              />
            </div>

          </div>    
        </Grid>
        <Grid item xs={12}>
          <div className={classes.cspContainer}>
            <Typography className={classes.csp}>
              Monthly Contribution:
            </Typography>
            <InputBase 
              type="number" 
              value={goalParams.cspAmount} 
              onChange={(e)=>{changeCSP(e.target.value, setGoalParams)}}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              className={classes.cspAmount}
            />
          </div>
 
        </Grid>
        <Grid item xs={12}>
          <Select value={monthIdx[goalParams.targetDate.getMonth()]} onChange={(e)=>updateTimeM(e.target.value, setGoalParams)}>
            {monthOptions}
          </Select>
          <Select value={goalParams.targetDate.getFullYear()} onChange={(e)=>updateTimeY(e.target.value, setGoalParams)}>
            {yearOptions}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select value={goalParams.riskTolerance} onChange={(e)=>updateRisk(e.target.value, setGoalParams)}>
                        <option value="1">Low</option>
                        <option value="2">Low to Medium</option>
                        <option value="3">Medium</option>
                        <option value="4">Medium to High</option>
                        <option value="5">High</option>
                      </Select>
        </Grid>
      <Button variant="contained" color="default" onClick={()=>props.setGoalSelect(null)}>Back</Button>
      <Button variant="contained" color="secondary" onClick={()=>syncGoal()}>Save</Button>
      </Grid>

    </div>
  )
}

export default GoalDetails
