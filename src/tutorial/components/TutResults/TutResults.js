import { Button } from '@material-ui/core';
import {nextTut, updateTitle, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, updateCSP} from '../../utils/update-functions.js'
import {calcCSP} from '../../utils/calc-functions.js'

function TutResults(props){
  // let csp = calcCSP(props.tutParams)
  // props.setTutParams(prev=>{
  //   return{
  //     ...prev,
  //     cspAmount: csp
  //   }
  // })
  return(
    <div>
      Based on your inputs, you should save the following amount each month. 
    <div>
      {props.tutParams.cspAmount}
    </div>
      <Button onClick={()=>nextTut(props.setTutSec)}>Next</Button>
    </div>
  )
}

export default TutResults