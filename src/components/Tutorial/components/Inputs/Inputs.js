import { useEffect } from 'react';
import { Button, Grid, Input, Tooltip, NativeSelect, Typography, InputAdornment, Slider } from '@material-ui/core';
import { nextTut, updateTitle, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, updateCSP }
  from '../../../../utils/update-functions.js';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  footerBtn:{
    width: '75%',
    borderRadius: '1rem',
    marginTop: '1rem',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500'
  },
  inputField:{
    width: '50%',
    margin: '0 auto',
    fontSize: '1.5rem',
    fontWeight: '500',
    color: '#303030'
  },
  outputField:{
    fontSize: '1.5rem',
    color: '#303030',
    textAlign: 'center',
    fontWeight: '500',
  },
  centerContainer:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '25vh'
  },
  footerContainer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '25vh',
  },
  headerContainer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '25vh'
  },
  headerText:{
    fontSize: '1.8rem',
  },
  subText:{
    fontSize: '1.5rem'
  },
  subSubText:{
    fontSize: '0.9rem',
    color: '#505050'
  },
  selectBorder:{
    margin: '0 1.5rem 0.5rem 1.5rem',
    borderRadius: '0.5rem',
    width: '6rem',
    fontSize: '1.4rem',
    color: '#353535'
  },
  riskDesc:{
    color: '#356895',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: '1.2rem'
  },
  riskSliderContainer:{
    width: '100%',
    margin: '0 auto 0.1rem auto'
  },
  riskPrompt:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tooltipFont:{
    fontSize: '1.2rem !important'
  }
}))

const RiskSlider = withStyles({
  track:{
    color: '#303030',
    height: '0.5rem',
    borderRadius: '2rem'
  },
  rail:{
    color: '#303030',
    opacity: '1',
    height: '0.5rem',
    borderRadius: '2rem'
  },
  thumb:{
    width: '1.5rem',
    height: '1.5rem',
    border: '2px solid grey',
    marginTop: '-8px'
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


function TutorialStep({ setTutSec, prompt, input }) {
  const classes = useStyles()
  return(
    <div>
      <Grid
        container
        // direction="column"
        // justifyContent="stretch"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs={12}>
          <div className={classes.headerContainer}>
              {prompt}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.centerContainer}>
            {input}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.footerContainer}>
            <Button
              className={classes.footerBtn}
              variant="contained"
              color="primary"
              onClick={() => nextTut(setTutSec)}
            >
              Continue
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

function InputOne(props){
  const classes = useStyles()
  return(
    <TutorialStep
      setTutSec={props.setTutSec}
      prompt={<Typography variant="h6" align="center">
        <span className={classes.headerText}>
          Let's create your first financial goal!
        </span>
        <br/>
        <span className={classes.subText}>
          Give it a name:
        </span>
      </Typography>}
      input={
        <Input
          type="text"
          className={classes.inputField}
          onChange={(e) => updateTitle(e.target.value, props.setTutParams)}
        />}
    />
  );
}

function InputTwo(props){
  const classes = useStyles()
  return(
    <TutorialStep
      setTutSec={props.setTutSec}
      prompt={<Typography variant="h6" align="center"><span className={classes.subText}>
        How much do you need to save to reach this goal?
      </span></Typography>}
      input={
        <Input type="number" 
          onChange={(e) => updateTarget(e.target.value, props.setTutParams)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          className={classes.inputField}
        />
      }
    />
  );
}

function InputThree(props){
  const classes = useStyles()
  let today = new Date();
  let monthIdx=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  let yearOptions = [];
  for(let i = 0; i < 76; i++){
    yearOptions.push(
      <option value={`${today.getFullYear()+i}`} key={i} >
        {today.getFullYear()+i}
      </option>
    );
  }

  let monthOptions = []
  for(let i = 0; i < 12; i++ ){
    monthOptions.push(
      <option value={monthIdx[i]} key={i}>
        {monthIdx[i]}
      </option>
    );
  }

  return(
    <TutorialStep
      setTutSec={props.setTutSec}
      prompt={<Typography variant="h6" align="center"><span className={classes.subText}>
        When would you like reach this goal?
        </span></Typography>}
      input={
        <div>
          <NativeSelect
            defaultValue={monthIdx[today.getMonth()]}
            onChange={(e) => updateTimeM(monthIdx.indexOf(e.target.value), props.setTutParams)}
            className={classes.selectBorder}
          >
            {monthOptions}
          </NativeSelect>
          <NativeSelect
            defaultValue={today.getFullYear()}
            onChange={(e) => updateTimeY(e.target.value, props.setTutParams)}
            className={classes.selectBorder}
          >
            {yearOptions}
          </NativeSelect>
        </div>
      }
    />
  );
}

function InputFour(props){
  const classes = useStyles()
  return(
    <TutorialStep
      setTutSec={props.setTutSec}
      prompt={<Typography variant="h6" align="center"><span className={classes.subText}>
        How much have you saved up so far?
        </span></Typography>}
      input={
        <Input
          type="number"
          onChange={(e) => updateCurrent(e.target.value, props.setTutParams)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          className={classes.inputField}
        />
      }
    />
  );
}

function InputFive(props){
  const classes = useStyles()

  const moreInfo= 'To help you reach your goal faster, you want your savings to be invested. There is always a trade off between risk and return. Typically higher risk investments have historically yielded higher returns in the long run.'

  return(
    <TutorialStep
      setTutSec={props.setTutSec}
      prompt={
        <div className={classes.riskPrompt}>
          <Typography><span className={classes.subText}>
            What Level of risk are you willing to take?
          </span></Typography>
          <Tooltip title={<p style={{'font-size':'0.9rem'}}>{moreInfo}</p>} className={classes.tooltipFont}>
            <Typography >
              <span className={classes.subSubText}>
                Hover over or hold to find out more
              </span>
            </Typography>
          </Tooltip>
        </div>
      }
      input={<>
        <div className={classes.riskSliderContainer}>
          <RiskSlider
            min={1}
            max={5}
            step={1}
            defaultValue={props.tutParams.riskTolerance}
            onChangeCommitted={(e, value)=>updateRisk(value, props.setTutParams)}
          />
        </div>
        <Typography className={classes.riskDesc}>
          {riskDescLabel[props.tutParams.riskTolerance-1]}
        </Typography>
        <Typography className={classes.riskDesc}>
          {riskReturn[props.tutParams.riskTolerance-1]}
        </Typography>
      </>}
    />
  );
}

function TutResults(props){
  const classes = useStyles()
  useEffect(() => {
    console.log(props.tutParams);
    updateCSP(props.tutParams, props.setTutParams);
  }, []);

  return(
    <TutorialStep
      setTutSec={props.setTutSec}
      prompt={<span className={classes.subText}>
        Based on your inputs, you should save the following amount each month. 
        </span>}
      input={
        <Typography className={classes.outputField}>
          ${props.tutParams.cspAmount}
        </Typography>
      }
    />
  );
}

export { InputOne, InputTwo, InputThree, InputFour, InputFive, TutResults };
