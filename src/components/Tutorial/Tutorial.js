import {useEffect, useState, useRef} from 'react';
import {InputOne, InputTwo, InputThree, InputFour, InputFive, TutResults} from './components/Inputs/Inputs';
import TutDetails from './components/TutDetails/TutDetails';
import Registration from './components/Registration/Registration';


function Tutorial(props){
  const [tutSec, setTutSec] = useState(1)
  const [tutParams, setTutParams] = useState({
    title: '',
    targetAmount: 0,
    targetDate: new Date(),
    currentAmount: 0,
    riskTolerance: 3,
    cspAmount: 0,
  })
  const[tutProgress, setTutProgress] = useState(1)

  switch(tutSec){
    case 1:
      return(
        <div>
          <InputOne setTutSec={setTutSec} setTutParams={setTutParams} tutParams={tutParams}/>
        </div>
      );
    case 2:
      return(
        <div>
          <InputTwo setTutSec={setTutSec} setTutParams={setTutParams}/>
        </div>
      );
    case 3:
      return(
        <div>
          <InputThree setTutSec={setTutSec} setTutParams={setTutParams} tutParams={tutParams}/>
        </div>
      );
    case 4:
      return(
        <div>
          <InputFour setTutSec={setTutSec} setTutParams={setTutParams}/>
        </div>
      );
    case 5:
      return(
        <div>
          <InputFive setTutSec={setTutSec} tutParams={tutParams}  setTutParams={setTutParams}/>
        </div>
      )
    case 6:
      return(
        <div>
          <TutResults setTutSec={setTutSec} tutParams={tutParams} setTutParams={setTutParams}/>
        </div>
      )
    case 7:
      return(
        <div>
          <TutDetails 
            setTutSec={setTutSec} 
            tutParams={tutParams} 
            setTutParams={setTutParams} 
            tutProgress={tutProgress}
            setTutProgress={setTutProgress}
          />
        </div>
      )
    case 8:
      return(
        <div>
          <Registration
            history={props.history}
            tutParams={tutParams}
            tutProgress={tutProgress}
            setUser={props.setUser}
            setGoals={props.setGoals}
          />
        </div>
      )
    default:
      return(
        <div>
          <InputOne setTutSec={setTutSec} setTutParams={setTutParams}/>
        </div>
      );
  }

}

export default Tutorial
