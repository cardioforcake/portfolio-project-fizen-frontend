import { useEffect } from "react"
import { Button, Slider, Input, NativeSelect, Grid, Typography,InputAdornment, Card } from '@material-ui/core';
import { updateProgress, nextTut, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, changeCSP, updateCSP} from '../../../../utils/update-functions.js'
import { calcProgress} from '../../../../utils/calc-functions.js'
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  titleLabel:{
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
  },
  headerBtn:{
    width: '100%',
    borderRadius: '1rem',
    marginTop: '0',
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

function TutDetails(props){
  const classes = useStyles()
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
    monthOptions.push(<option value={i} key={i}>{monthIdx[i]}</option>)
  }

  return(
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Button 
            className={classes.headerBtn} 
            variant="contained" color="primary" 
            onClick={()=>{nextTut(props.setTutSec); updateCSP(props.tutParams, props.setTutParams)}}
          >
            Register & Save
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.titleLabel}>
            {props.tutParams.title.toUpperCase()} 
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <div>
          <div className={classes.progressBar}>
            <ProgressSlider
              min={0.5}
              max={1.5}
              step={0.01}
              key={`${props.tutProgress}`}
              orientation="vertical"
              defaultValue={props.tutProgress}
              onChangeCommitted={(e, value)=>{updateProgress(value, props.setTutProgress, props.tutParams, props.setTutParams)}}
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
                value={props.tutParams.targetAmount} 
                onChange={(e)=>{updateTarget(e.target.value, props.setTutParams)}}
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
                value={props.tutParams.currentAmount} 
                onChange={(e)=>updateCurrent(e.target.value, props.setTutParams)}
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
              value={props.tutParams.cspAmount} 
              onChange={(e)=>{changeCSP(e.target.value, props.setTutParams)}}
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
                value={props.tutParams.targetDate.getMonth()} 
                onChange={(e)=>updateTimeM(e.target.value, props.setTutParams)}
                className={classes.selectBorder}
              >
                {monthOptions}
              </NativeSelect>
              <NativeSelect 
                value={props.tutParams.targetDate.getFullYear()} 
                onChange={(e)=>updateTimeY(e.target.value, props.setTutParams)}
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
              defaultValue={3}
              onChangeCommitted={(e, value)=>updateRisk(value, props.setTutParams)}
            />
          </div>

          <Typography className={classes.riskDesc}>
            {riskDescLabel[props.tutParams.riskTolerance-1]}
          </Typography>
          <Typography className={classes.riskDesc}>
            {riskReturn[props.tutParams.riskTolerance-1]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button 
            className={classes.footerBtn} 
            variant="contained" color="primary" 
            onClick={()=>{nextTut(props.setTutSec); updateCSP(props.tutParams, props.setTutParams)}}
          >
            Register & Save
          </Button>
        </Grid>

      </Grid>

    </div>
  )
}

export default TutDetails