import { Button, List, ListItem, Typography, Card,Slider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styles from './GoalThumbNail.module.css'
const useStyles = makeStyles((theme)=>({
  goalTN:{
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderTN:{
    height: '30vh',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  title:{
    marginLeft: '10px',
    height: '15vh'
  },
  balance:{
    height: '15vh'
  },
  center:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const ThumbNailSlider = withStyles({
  root: {
    color: 'black',

  },
  thumb:{
    marginLeft:'-4px !important',
    width: '1rem',
    borderRadius: '0.2rem !important',
    height: '0.5rem',
    color: 'blue'
  },
  active: {},
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
  return(
    <div>
      <Typography variant="h4" className={classes.center}>
        MY GOALS
      </Typography>
      <Card onClick={()=>{props.setGoalSelected(0)}} className={classes.goalTN}>
        <Typography variant="h5" className={classes.title}>
          {props.title.toUpperCase()}
        </Typography>
        <div className={classes.sliderTN}>
          <ThumbNailSlider 
            min={0.5}
            max={1.5}
            orientation="vertical"
            value={props.progress}
          />
        </div>
      </Card>
    </div>

  )
}

export default GoalThumbNail