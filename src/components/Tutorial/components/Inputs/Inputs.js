import { useEffect } from 'react';
import { Button, Grid, Input, Select, Typography } from '@material-ui/core';
import { nextTut, updateTitle, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, updateCSP }
  from '../../../../utils/update-functions.js';


function TutorialStep({ setTutSec, prompt, input }) {
  return(
    <div>
      <Grid
        container
        direction="column"
        justifyContent="stretch"
        alignItems="center"
        spacing={10}
      >
        <Grid item>
          <Typography variant="h6" align="center">
            {prompt}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          {input}
        </Grid>
        <Grid item>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => nextTut(setTutSec)}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

function InputOne(props){
  return(
    <TutorialStep
      setTutSec={props.setTutSec}
      prompt={<span>
        Let's set your first financial goal!<br/>Give it a name:
      </span>}
      input={
        <Input
          fullWidth
          type="text"
          onChange={(e) => updateTitle(e.target.value, props.setTutParams)}
        />}
    />
  );
}

function InputTwo(props){
  return(
    <TutorialStep
      setTutSec={props.setTutSec}
      prompt={<span>
        How much do you need to save to reach this goal?
      </span>}
      input={
        <Input type="number" onChange={(e) => updateTarget(e.target.value, props.setTutParams)}/>
      }
    />
  );
}

function InputThree(props){
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
      prompt={<span>
        How many years from now would you like to reach this goal?
        </span>}
      input={
        <div>
          <Select
            defaultValue={monthIdx[today.getMonth()]}
            onChange={(e) => updateTimeM(monthIdx.indexOf(e.target.value), props.setTutParams)}
          >
            {monthOptions}
          </Select>
          <Select
            defaultValue={today.getFullYear()}
            onChange={(e) => updateTimeY(e.target.value, props.setTutParams)}
          >
            {yearOptions}
          </Select>
        </div>
      }
    />
  );
}

function InputFour(props){
  return(
    <TutorialStep
      setTutSec={props.setTutSec}
      prompt={<span>
        How much have you saved up so far?
        </span>}
      input={
        <Input
          type="number"
          onChange={(e) => updateCurrent(e.target.value, props.setTutParams)}
        />
      }
    />
  );
}

function InputFive(props){
  return(
    <TutorialStep
      setTutSec={props.setTutSec}
      prompt={<span>
        In order to help you reach your goal faster, you want your savings to be invested.
        What level of risk are you willing to take?
        </span>}
      input={
        <Select
          defaultValue={"3"}
          onChange={(e) => updateRisk(e.target.value, props.setTutParams)}
        >
          <option value="1">Low</option>
          <option value="2">Low to Medium</option>
          <option value="3">Medium</option>
          <option value="4">Medium to High</option>
          <option value="5">High</option>
        </Select>
      }
    />
  );
}

function TutResults(props){
  useEffect(() => {
    console.log(props.tutParams);
    updateCSP(props.tutParams, props.setTutParams);
  }, []);

  return(
    <TutorialStep
      setTutSec={props.setTutSec}
      prompt={<span>
        Based on your inputs, you should save the following amount each month. 
        </span>}
      input={
        <Typography variant="h5">{props.tutParams.cspAmount}</Typography>
      }
    />
  );
}

export { InputOne, InputTwo, InputThree, InputFour, InputFive, TutResults };
