import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

function nextTut(ts, sts){
  sts(ts+1)
}

function InputOne(props){
  return(
    <div>
      Tutorial #1
      <Button onClick={()=>nextTut(props.tutSec, props.setTutSec)}>Next</Button>
    </div>
  )
}

function InputTwo(props){
  return(
    <div>
      Tutorial #2
      <Button onClick={()=>nextTut(props.tutSec, props.setTutSec)}>Next</Button>
    </div>
  )
}

function InputThree(props){
  return(
    <div>
      Tutorial #3
      <Button onClick={()=>nextTut(props.tutSec, props.setTutSec)}>Next</Button>
    </div>
  )
}

function InputFour(props){
  return(
    <div>
      Tutorial #4
      <Button onClick={()=>nextTut(props.tutSec, props.setTutSec)}>Next</Button>
    </div>
  )
}

function InputFive(props){
  return(
    <div>
      Tutorial #5
      <Button onClick={()=>nextTut(props.tutSec, props.setTutSec)}>Next</Button>
    </div>
  )
}

export {InputOne, InputTwo, InputThree, InputFour, InputFive}