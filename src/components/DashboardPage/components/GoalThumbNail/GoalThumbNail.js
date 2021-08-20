import { Button, Typography, Card,Slider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ThumbNailFooter from './components/ThumbNailFooter/ThumbNailFooter'
import {useState, useEffect} from 'react'
import {showPrev, showNext} from '../../../../utils/utility-functions.js'

const useStyles = makeStyles((theme)=>({
  goalTN:{
    height: '60vh',
    width: '70%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1rem',
    boxShadow: '0px 1px 10px 1px black'
  },
  sliderTN:{
    height: '35vh',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  title:{
    marginLeft: '10px',
    height: '15vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  titleLabel:{
    color: '#356895',
    fontSize: '1.2rem',
    fontWeight: '600'
  },
  balance:{
    height: '15vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  balanceLabel:{
    color: '#356895',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    fontWeight: '600',
  },
  balanceAmount:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '500',
    fontSize: '1.4rem',
  },
  header:{
    height: '10vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#356895',
    fontSize: '1.5rem',
    fontWeight: '600'
  },
  footer:{
    height: '15vh',
    // width: '70%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  message:{
    fontSize: '1.1rem',
    color: 'black'
  },
  middleBlock:{
    display: 'flex',
  },
  arrow:{
    width: '15%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowBtn:{
    width: '1rem',
    height: '2rem'
  }
}))

const marks = [
  {
    value: 0.55,
    label: 'Behind',
  },
  {
    value: 1,
    label: 'On Track',
  },
  {
    value: 1.45,
    label: 'Ahead',
  },
];

const ThumbNailSlider = withStyles({
  root: {
    color: 'black',

  },
  thumb:{
    marginLeft:'-5.5px !important',
    width: '1.3rem',
    // borderRadius: '0.2rem !important',
    height: '1.3rem',
    color: '#356895',
    border: 'solid grey'
  },
  rail:{
    // backgroundImage:  'linear-gradient(.50turn, #f00, #00f)',
    width: '0.5rem !important',
    opacity: '1 !important',
    borderRadius: '0.5rem'

  },
  track:{
    // backgroundImage:  'linear-gradient(.50turn, #f00, #00f)',
    width: '0.5rem !important',
    borderRadius: '0.5rem'
  },
})(Slider)

function GoalThumbNail(props){
  const classes = useStyles()
  const [message, setMessage] = useState('You are on track!')

  useEffect(()=>{
    if(props.progress > 1.1){
      setMessage('You are ahead!')
    }else if(props.progress < 0.75){
      setMessage('Time to update your goal!')
    }else if(props.progress < 0.85){
      setMessage("Just a bit behind")
    }
  },[])

  return(
    <div>
      <Typography className={classes.header}>
        MY GOALS
      </Typography>
      <div className={classes.middleBlock}>
        <div className={classes.arrow}>
          {props.goalDisplayed>0 ? 
            <div className={classes.arrowBtn} onClick={()=>{showPrev(props.setGoalDisplayed)}}>
              <img src="/leftArrow.svg" alt="Edit" height="100%" />
            </div>
          :
            <div></div>
          }
        </div>
        <Card onClick={()=>{props.setGoalSelected(props.goalDisplayed);}} className={classes.goalTN}>
          <div className={classes.title}>
            <Typography className={classes.titleLabel}>
              {props.title.toUpperCase()}
            </Typography>
            <Typography className={classes.message}>{message}</Typography>
          </div>
          <div className={classes.sliderTN}>
            <ThumbNailSlider 
              min={0.5}
              max={1.5}
              orientation="vertical"
              value={props.progress}
              // marks={marks}
            />
          </div>
          <div className={classes.balance}>
            <Typography className={classes.balanceLabel}>
              CURRENT BALANCE:
            </Typography>
            <Typography className={classes.balanceAmount}>
              ${props.currentAmount}
            </Typography>
          </div>
        </Card>
        <div className={classes.arrow}>
          {props.goalDisplayed<props.numGoals ?
            <div className={classes.arrowBtn} onClick={()=>{showNext(props.setGoalDisplayed)}}>
              <img src="/rightArrow.svg" alt="Edit" height="100%" />
            </div>
          :
            <div></div>
          }

        </div>
      </div>
      
      <div className={classes.footer}>
        <ThumbNailFooter
          doCreateGoal={props.doCreateGoal}
          doDeleteGoal={props.doDeleteGoal}
        />
      </div>
 
    </div>

  )
}

export default GoalThumbNail
