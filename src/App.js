import {useEffect, useReducer} from 'react';
import {Pomodoros} from './components/Pomodoros';
import {Timer} from './components/Timer';
import { TimerControls } from './components/TimerControls';

// const workTimer = 1500;
// const breakTimer = 300;
// const bigBreakTimer = 1800;

const workTimer = 5;
const breakTimer = 2;
const bigBreakTimer = 5;

const initialTimer = {
  session: 'work',
  timeRemaining: workTimer,
  completedPomodoros: 0,
  scheduledCountdown: null,
};

const pomodoroReducer = (state, action) => {
  if(action.type === 'time-decrease'){
    if(state.timeRemaining - 1 <  0) return {...state};
    return {...state, timeRemaining: state.timeRemaining - 1};
  }

  if(action.type === 'start-timer'){
    return {...state, scheduledCountdown: action.scheduledCountdown};
    // return {...state, timeRemaining: state.timeRemaining - 1, scheduledCountdown: action.scheduledCountdown}; //just checking that clearInterval works
  }

  if(action.type === 'switch-to-work-session'){
    return {...state, timeRemaining: workTimer, session: 'work'};
  }

  if(action.type === 'switch-to-break-session'){
    if(state.completedPomodoros % 4 === 0){
      return {...state, timeRemaining: bigBreakTimer, session: 'big break'};
    } else {
      return {...state, timeRemaining: breakTimer ,session: 'break'};
    }
  }

  if(action.type === 'add-pomodoro'){
    return {...state, completedPomodoros: state.completedPomodoros + 1};
  }
}

function App() {
  const [timer, dispatch] = useReducer(pomodoroReducer, initialTimer);

  const countdown = () => {
    dispatch({type: 'time-decrease'});
  };
  //fn () => action

  const startTimer = () => {
    const scheduledCountdown = setInterval(countdown, 1000);
    dispatch({type: 'start-timer', scheduledCountdown: scheduledCountdown});
  };
  //fn () => action
  //starts countdown

  useEffect(()=>{
    if(timer.timeRemaining === 0) {
      clearInterval(timer.scheduledCountdown);

      if(timer.session === 'work'){
        dispatch({type: 'add-pomodoro'}); 
        //is this kosher? two dispatches one after another, should I add logic in useReducer instead
        //doesn't this update state and thus cause re-render
        //but I want the below to be a batched effect with the above
        //should I make it into one dispatch
        //or will the following dispatch take into account the above state changes?
        dispatch({type: 'switch-to-break-session'});
      }

      if(timer.session === 'break' || timer.session === 'big break'){
        dispatch({type: 'switch-to-work-session'});
      }
    };
  }, [timer.timeRemaining, timer.session, timer.scheduledCountdown]);



  return ( 
    <div className="App">
      <h1>Pomodoro</h1>
      <p>{timer.session}</p>
      <Pomodoros session={timer.session} completedPomodoros={timer.completedPomodoros}/>
      <Timer timeRemaining={timer.timeRemaining} />
      <TimerControls startTimer={startTimer} />
    </div>
  );
}

export default App;
