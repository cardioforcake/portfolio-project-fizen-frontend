import { useEffect, useState } from 'react';
import { Button, List, ListItem, Typography, Card } from '@material-ui/core';
import GoalDetails from './components/GoalDetails/GoalDetails'
import GoalThumbNail from './components/GoalThumbNail/GoalThumbNail'

function DashboardPage(props) {
  const [goalSelected, setGoalSelected] = useState(null);
  const [goalDisplayed, setGoalDisplayed] = useState(0)
  // const [zoomedGoal, setZoomedGoal] = useState(null)

  if(goalSelected===null){
    return(
      <div>
        <GoalThumbNail
          goal={props.goals[goalDisplayed]}
          progress={props.goals[goalDisplayed].progress}
          title={props.goals[goalDisplayed].title}
          currentAmount={props.goals[goalDisplayed].currentAmount}
          setGoalSelected={setGoalSelected}
        />
      </div>
    )
  }else{
    return(
      <div>
        <GoalDetails
          setGoals={props.setGoals}
          loadGoals={props.loadGoals}
          goal={props.goals[goalSelected]}
          setGoalSelect={setGoalSelected}
        />
      </div>
    )
  }
  // return (
  //   <div>

  //     {zoomedGoal ?
  //       <div>
  //         <Button onClick={() => setZoomedGoal(null)}>return to goals</Button>
  //         <Typography variant="h6">{zoomedGoal.title}</Typography>
  //         <List>
  //           <ListItem>description: {zoomedGoal.description}</ListItem>
  //           <ListItem>targetDate: {zoomedGoal.targetDate}</ListItem>
  //           <ListItem>targetAmount: {zoomedGoal.targetAmount}</ListItem>
  //           <ListItem>currentAmount: {zoomedGoal.currentAmount}</ListItem>
  //           <ListItem>riskTolerance: {zoomedGoal.riskTolerance}</ListItem>
  //           <ListItem>isReached: {zoomedGoal.isReached}</ListItem>
  //         </List>
  //       </div>
  //       :
  //       <div>
  //         <Typography variant="h3">My Goals</Typography>
  //         <List>
  //           {
  //             goals.length ?  goals.map((goal) => {
  //               return (
  //                 <ListItem
  //                   button
  //                   key={goal._id}
  //                   onClick={() => setZoomedGoal(goal)}
  //                 >
  //                   {goal.title}
  //                 </ListItem>
  //               );
  //             })
  //             : <ListItem component="div">No goals!</ListItem>
  //           }
  //         </List>
  //       </div>
  //     }
  //   </div>
  // );
}

export default DashboardPage
