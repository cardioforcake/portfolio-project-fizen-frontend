import {useEffect, useState, useRef} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {InputOne, InputTwo, InputThree, InputFour, InputFive} from './components/Inputs/Inputs';
import TutDetails from './components/TutDetails/TutDetails';
import TutResults from './components/TutResults/TutResults';


function Tutorial(props){
  const [tutSec, setTutSec] = useState(1)
  const [tutParams, setTutParas] = useState({
    title: '',
    targetAmount: 0,
    targetDate: new Date(),
    currentAmount: 0,
    riskTolerance: 3 
  })

  switch(tutSec){
    case 1:
      return(
        <div>
          <InputOne tutSec={tutSec} setTutSec={setTutSec}/>
        </div>
      );
    case 2:
      return(
        <div>
          <InputTwo tutSec={tutSec} setTutSec={setTutSec}/>
        </div>
      );
    case 3:
      return(
        <div>
          <InputThree tutSec={tutSec} setTutSec={setTutSec}/>
        </div>
      );
    case 4:
      return(
        <div>
          <InputFour tutSec={tutSec} setTutSec={setTutSec}/>
        </div>
      );
    case 5:
      return(
        <div>
          <InputFive tutSec={tutSec} setTutSec={setTutSec}/>
        </div>
      )
    default:
      return(
        <div>
          <InputOne tutSec={tutSec} setTutSec={setTutSec}/>
        </div>
      );
  }

}

export default Tutorial