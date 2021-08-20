import { useState, useEffect } from "react"
import { Button, Slider, Input, NativeSelect, Grid, Typography,InputAdornment, Card } from '@material-ui/core';
import {updateProgress, nextTut, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, changeCSP, updateCSP} from '../../../../utils/update-functions.js'
import {calcCSP, calcProgress, calcNewCSP} from '../../../../utils/calc-functions.js'
import { getAllGoals, updateGoal } from '../../../../utils/goals-api';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  titleLabel:{
    width: '50%',
    fontSize: '1.5rem',
    fontWeight: '500',
    color: '#356895',
    textAlign: 'center',
  },
  hearderContainer:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '1.6rem'
  },
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
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '1.2rem'
  },
  progressBar:{
    height: '14rem',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    marginLeft: '2rem'
  },
  targetLabel:{
    color: '#356895',
    fontSize: '1rem',
    fontWeight: '400',
    marginTop: '0.3rem'
  },
  targetAmount:{
    fontSize: '1.2rem',
    width: '70%',
    marginTop: '0.5rem',
  },
  currentLabel:{
    color: '#356895',
    fontSize: '1.2rem',
    fontWeight: '400'
  },
  currentAmount:{
    fontSize: '2rem',
    width: '70%',
    fontWeight: '500',
    marginTop: '0',
    color: '#505050'
  },
  csp:{
    color: '#356895',
    fontSize: '1.3rem',
    fontWeight: '500',
    marginRight: '2rem',
    marginLeft: '2rem'
  },
  cspContainer:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '13vh',
    margin: '1rem auto 0.5rem auto'
  },
  cspAmount:{
    fontSize: '2rem',
    width: '70%',
    fontWeight: '500',
    color: '#505050'
  },
  cspAmountContainer:{
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '13vh',
    margin: '1rem auto 0.5rem auto'
  },
  dateContainer:{
    backgroundColor: 'rgba(0,0,0,0)',
    height: '6rem',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectBorder:{
    margin: '0 1.5rem 0.5rem 1.5rem',
    borderRadius: '0.5rem',
    width: '5rem',
    fontSize: '1.4rem',
    color: '#353535'
  },
  dateSelectContainer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  dateSelectLabel:{
    color: '#356895',
    fontSize: '1.3rem',
    fontWeight: '400',
    marginBottom: '0',
    marginTop: '0.3rem'
  },
  riskLabel:{
    color: '#356895',
    textAlign: 'center',
    fontSize: '1.3rem',
    fontWeight: '400',
    marginTop: '1.2rem'
  },
  riskDesc:{
    color: '#356895',
    textAlign: 'center',
    fontWeight: '400'
  },
  riskSliderContainer:{
    width: '100%',
    margin: '0 auto 0.1rem auto'
  },
  arrow:{
    width: '15%',
    fontSize: '1rem',
    color:'#505050'
  },
  backBtn:{
    width: '1rem',
    height: '2rem'
  },
  saveBtn:{
    textAlign: 'right'
  },
  footerBtn:{
    width: '100%',
    borderRadius: '1rem',
    marginTop: '1rem',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500'
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

const RiskSlider = withStyles({
  track:{
    color: 'black',
    height: '2px'
  },
  rail:{
    color: 'black',
    opacity: '1',
    height: '2px'
  }
})(Slider)

const ProgressSlider = withStyles({
  root: {
    color: 'black',

  },
  thumb:{
    marginLeft:'-5px !important',
    width: '1.2rem',
    height: '1.2rem',
    color: '#356895',
    border: '3px solid grey'
  },
  rail:{
    width: '0.5rem !important',
    opacity: '1 !important',
    borderRadius: '0.5rem'
  },
  track:{
    width: '0.5rem !important',
    borderRadius: '0.5rem'
  },
  markLabel:{
    marginLeft: -90,
    fontSize: '1rem'
  },
  markActive:{
    opacity: '0'
  }
})(Slider)

const riskDescLabel=[
  'Low Risk',
  'Low to Medium Risk',
  'Medium Risk',
  'Medium to High Risk',
  'High Risk'
]

const riskReturn=[
  '~2-3%',
  '~3-5%',
  '~5-6.5%',
  '~6.5-8.5%',
  '~8.5%+'
]


function GoalDetails(props){
  const classes = useStyles()
  

  const [goalParams, setGoalParams]= useState({
    title: '',
    targetAmount: 0,
    targetDate: new Date(),
    currentAmount: 0,
    riskTolerance: 3,
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
          <div className={classes.hearderContainer}>
            <div className={classes.arrow}>
              <div className={classes.backBtn} onClick={()=>props.setGoalSelect(null)}>
                BACK
                {/* <img src="/leftArrow.svg" alt="Edit" height="100%" /> */}
              </div>
            </div>
            <Typography className={classes.titleLabel}>
              {goalParams.title.toUpperCase()} 
            </Typography>
            <div className={classes.arrow}>
              <div className={classes.saveBtn} onClick={()=>syncGoal()}>
                SAVE
              </div>
            </div>
          </div>

          {/* <InputBase 
            type="text" 
            value={goalParams.title.toUpperCase()} 
            onChange={(e)=>{updateTitle(e.target.value, setGoalParams)}}
            className={classes.titleLabel}
          /> */}
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
                className={classes.targetAmount}
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
                className={classes.currentAmount}
              />
            </div>
          </div>    
        </Grid>
        <Grid item xs={6}>
          <div className={classes.cspContainer}>
            <Typography className={classes.csp}>
              Monthly Contribution:
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.cspAmountContainer}>
            <Input
              type="number" 
              value={goalParams.cspAmount} 
              onChange={(e)=>{changeCSP(e.target.value, setGoalParams)}}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              className={classes.cspAmount}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.dateContainer}>
            <Typography className={classes.dateSelectLabel}>
              Target Date
            </Typography>
            <div className={classes.dateSelectContainer}>
              <NativeSelect 
                value={monthIdx[goalParams.targetDate.getMonth()]} 
                onChange={(e)=>updateTimeM(e.target.value, setGoalParams)}
                className={classes.selectBorder}
              >
                {monthOptions}
              </NativeSelect>
              <NativeSelect 
                value={goalParams.targetDate.getFullYear()} 
                onChange={(e)=>updateTimeY(e.target.value, setGoalParams)}
                className={classes.selectBorder}
              >
                {yearOptions}
              </NativeSelect>
            </div>
          </Card>
 
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.riskLabel}>
            Risk Level
          </Typography>
          <div className={classes.riskSliderContainer}>
            <RiskSlider
              min={1}
              max={5}
              step={1}
              defaultValue={props.goal.riskTolerance}
              onChangeCommitted={(e, value)=>updateRisk(value, setGoalParams)}
            />
          </div>

          <Typography className={classes.riskDesc}>
            {riskDescLabel[goalParams.riskTolerance-1]}
          </Typography>
          <Typography className={classes.riskDesc}>
            {riskReturn[goalParams.riskTolerance-1]}
          </Typography>
          {/* <NativeSelect value={goalParams.riskTolerance} onChange={(e)=>updateRisk(e.target.value, setGoalParams)}>
                        <option value="1">Low</option>
                        <option value="2">Low to Medium</option>
                        <option value="3">Medium</option>
                        <option value="4">Medium to High</option>
                        <option value="5">High</option>
            </NativeSelect> */}
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.footerBtn} variant="contained" color="secondary" onClick={()=>syncGoal()}>Save</Button>
        </Grid>

      </Grid>

    </div>
  )
}

export default GoalDetails
