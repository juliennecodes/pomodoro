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
};

const pomodoroReducer = (state, action) => {
  if(action.type === 'time-decrease'){
    if(state.timeRemaining - 1 <  0) return {...state};
    return {...state, timeRemaining: state.timeRemaining - 1};
  }
}

function App() {
  const [timer, dispatch] = useReducer(pomodoroReducer, initialTimer);

  const countdown = () => {
    dispatch({type: 'time-decrease'});
  };
  //fn () => action

  

  const startTimer = () => {
    setInterval(countdown, 1000);
  };
  //fn () => action
  //starts countdown



  return ( 
    <div className="App">
      <h1>Pomodoro</h1>
      <Timer timeRemaining={timer.timeRemaining} />
      <TimerControls startTimer={startTimer} />
    </div>
  );
}

export default App;
