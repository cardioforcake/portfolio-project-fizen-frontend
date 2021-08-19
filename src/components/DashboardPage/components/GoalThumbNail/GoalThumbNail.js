import { Button, List, ListItem, Typography, Card } from '@material-ui/core';

function GoalThumbNail(props){
  return(
    <Card onClick={()=>{props.setGoalSelected(0)}}>
      <p>{props.title}</p>
      <p>{props.progress}</p>
      
    </Card>
  )
}

export default GoalThumbNail