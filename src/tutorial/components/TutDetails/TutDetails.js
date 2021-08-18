import { Button } from '@material-ui/core';
import {nextTut, updateTitle, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, updateCSP} from '../../utils/update-functions.js'
import {calcCSP, calcProgress, calcNewCSP} from '../../utils/calc-functions.js'

function TutDetails(props){

  return(
    <div>
      <p>Progress%: {calcProgress(props.tutParams)}</p>
      <p>CSP Amount: {props.tutParams.cspAmount}</p>
      <p>updated CSP assuming 50% progress: {calcNewCSP(props.tutParams, 1.5)}</p>
    </div>
  )
}

export default TutDetails