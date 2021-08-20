import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, List, ListItem, Typography, Card } from '@material-ui/core';
import GoalDetails from './components/GoalDetails/GoalDetails'
import GoalThumbNail from './components/GoalThumbNail/GoalThumbNail'
import { createGoal, deleteGoal } from '../../utils/goals-api';

function DashboardPage(props) {
  const [goalSelected, setGoalSelected] = useState(null);
  const [goalDisplayed, setGoalDisplayed] = useState(0)
  // const [zoomedGoal, setZoomedGoal] = useState(null)
  const history = useHistory();

  async function doCreateGoal() {
    const goalPayload = ({
      title: 'new goal',
      targetAmount: 0,
      targetDate: new Date(),
      currentAmount: 0,
      riskTolerance: 3,
      cspAmount: 0,
      progress: 0.5,
    });

    const { goals, message } = await createGoal(goalPayload);

    if (goals) {
      await props.setGoals(goals);

      // set the focused goal to the last one (the one just created);
      setGoalDisplayed(props.goals.length - 1);
    } else {
    }
  }

  async function doDeleteGoal() {
    const { goals, message } = await deleteGoal(props.goals[goalDisplayed]);
    // TODO handle message

    if (goals) {
      await props.setGoals(goals);

      // set the focused goal to the last one, else null
      const newGoalDisplayed = props.goals.length - 1;
      if (newGoalDisplayed >= 0) {
        setGoalDisplayed(newGoalDisplayed);
      } else {
        setGoalDisplayed(null);
      }
    }
  }

  if(goalSelected===null){
    return(
      <div>
        <GoalThumbNail
          goalDisplayed={goalDisplayed}
          setGoalDisplayed={setGoalDisplayed}
          numGoals={props.goals.length-1}
          goal={props.goals[goalDisplayed]}
          progress={props.goals[goalDisplayed].progress}
          title={props.goals[goalDisplayed].title}
          currentAmount={props.goals[goalDisplayed].currentAmount}
          setGoalSelected={setGoalSelected}
          doCreateGoal={doCreateGoal}
          doDeleteGoal={doDeleteGoal}
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
