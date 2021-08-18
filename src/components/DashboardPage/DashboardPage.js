import { useState } from 'react';
import { Button, List, ListItem, Typography } from '@material-ui/core';


export default function DashboardPage({ goals }) {
  const [zoomedGoal, setZoomedGoal] = useState(null);

  return (
    <div>
      {zoomedGoal ?
        <div>
          <Button onClick={() => setZoomedGoal(null)}>return to goals</Button>
          <Typography variant="h6">{zoomedGoal.title}</Typography>
          <List>
            <ListItem>description: {zoomedGoal.description}</ListItem>
            <ListItem>targetDate: {zoomedGoal.targetDate}</ListItem>
            <ListItem>targetAmount: {zoomedGoal.targetAmount}</ListItem>
            <ListItem>currentAmount: {zoomedGoal.currentAmount}</ListItem>
            <ListItem>riskTolerance: {zoomedGoal.riskTolerance}</ListItem>
            <ListItem>isReached: {zoomedGoal.isReached}</ListItem>
          </List>
        </div>
        :
        <div>
          <Typography variant="h3">My Goals</Typography>
          <List>
            {
              goals.length ?  goals.map((goal) => {
                return (
                  <ListItem
                    button
                    key={goal._id}
                    onClick={() => setZoomedGoal(goal)}
                  >
                    {goal.title}
                  </ListItem>
                );
              })
              : <ListItem component="div">No goals!</ListItem>
            }
          </List>
        </div>
      }
    </div>
  );
}
