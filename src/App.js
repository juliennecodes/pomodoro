import {useState, useEffect, useReducer} from 'react';
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
  timeRemaining: workTimer,
  session: 'work',
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

  if(action.type === 'switch-session-to-break'){
    return {...state, timeRemaining: breakTimer ,session: 'break'};
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
      dispatch({type: 'switch-session-to-break'});
    };
  }, [timer.timeRemaining, timer.scheduledCountdown]);



  return ( 
    <div className="App">
      <h1>Pomodoro</h1>
      <p>{timer.session}</p>
      <Timer timeRemaining={timer.timeRemaining} />
      <TimerControls startTimer={startTimer} />
    </div>
  );
}

export default App;
