import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, List, ListItem, Typography, Card } from '@material-ui/core';
import GoalDetails from './components/GoalDetails/GoalDetails'
import GoalThumbNail from './components/GoalThumbNail/GoalThumbNail'
import { createGoal, deleteGoal } from '../../utils/goals-api';
import ThumbNailFooter from './components/GoalThumbNail/components/ThumbNailFooter/ThumbNailFooter';


function DashboardPage(props) {
  const [goalSelected, setGoalSelected] = useState(null);
  const [goalDisplayed, setGoalDisplayed] = useState(0)
  const [loading, setLoading] = useState(true)
  // const [zoomedGoal, setZoomedGoal] = useState(null)
  const history = useHistory();

  useEffect(() => {
    if (props.goals.length > 0) {
      setGoalDisplayed(0);
      setGoalSelected(null);
      setLoading(false);
    }
  }, [props.goals]);

  async function doCreateGoal() {
    const goalPayload = ({
      title: 'new goal',
      targetAmount: 0,
      targetDate: new Date(),
      currentAmount: 0,
      riskTolerance: 3,
      cspAmount: 0,
      progress: 1,
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
      setLoading(true);
      await props.setGoals(goals);
    }
  }

  return(
    <div>{loading
      ? 
      <div>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>
            <span>Loading Goals... maybe you don't have any yet?</span>
          </Grid>
          <Grid item>
            <ThumbNailFooter
              doCreateGoal={doCreateGoal}
            />
          </Grid>
        </Grid>
      </div>
      :
      <div>{(goalSelected === null)
        ?
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
        :
        <div>
          <GoalDetails
            setGoals={props.setGoals}
            loadGoals={props.loadGoals}
            goal={props.goals[goalSelected]}
            setGoalSelect={setGoalSelected}
          />
        </div>
        }
      </div>
      }
    </div>
  );
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

export default DashboardPage
