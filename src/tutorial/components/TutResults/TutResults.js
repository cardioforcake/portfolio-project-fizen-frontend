import { Button } from '@material-ui/core';
import {nextTut, updateTitle, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk} from '../../utils/util-functions.js'

function TutResults(props){
  return(
    <div>
      Tutorial Results
      <Button onClick={()=>nextTut(props.setTutSec)}>Next</Button>
    </div>
  )
}

export default TutResults