import { Button, Slider } from '@material-ui/core';
import {updateProgress, nextTut, updateTitle, updateTarget, updateTimeY, updateTimeM, updateCurrent, updateRisk, updateCSP} from '../../utils/update-functions.js'
import {calcCSP, calcProgress, calcNewCSP} from '../../utils/calc-functions.js'
import styles from './TutDetails.module.css'
import { useEffect, useState } from 'react';

function TutDetails(props){
  const [progressT, setProgressT] = useState(0)
  useEffect(function(){
    if(calcProgress(props.tutParams) !== props.tutProgress){
      props.setTutProgress(calcProgress(props.tutParams))
    }
    setProgressT(props.tutProgress*100-50)
  },[props.tutParams])

  // useEffect(function(){
  //   if(calcNewCSP(props.tutParams, props.tutProgress)!== props.tutParams.cspAmount){
  //     props.setTutParams(prev=>{
  //       return{
  //         ...prev,
  //         cspAmount: calcNewCSP(props.tutParams, props.tutProgress)
  //       }
  //     })
  //   }
  // },[props.tutProgress])
  
  return(
    <div>
      <p>Progress%: {props.tutParams.progress}</p>
      <p>CSP Amount: {props.tutParams.cspAmount}</p>
      {/* <p>updated CSP assuming 50% progress: {calcNewCSP(props.tutParams, props.tutProgress)}</p> */}
      <div className={styles.progressBar}>
        <Slider
          key={`${props.tutProgress}`}
          orientation="vertical"
          defaultValue={props.tutProgress*100-50}
          onChangeCommitted={(e, value)=>{updateProgress(value, props.setTutProgress)}}
        />
      </div>

    </div>
  )
}

export default TutDetails