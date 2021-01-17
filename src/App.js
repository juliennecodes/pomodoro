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
  active: false,
  session: 'work',
  timeRemaining: workTimer,
  completedPomodoros: 2,
  scheduledCountdown: null,
};

const pomodoroReducer = (state, action) => {
  switch(action.type){
    case 'timer-counting-down': return{...state, active: true, timeRemaining: state.timeRemaining - 1};
    // case 'start-timer' : return {...state, active: true};
    case 'start-timer' : return {...state, active: true, scheduledCountdown: action.scheduledCountdown};
    // case 'stop-timer' : return {...state, active: false};
    case 'stop-timer' : return {...state, active: false, scheduledCountdown: null};
    // case 'timer-ends' : state.session === 'work' ? {...state, session: 'break' ,completedPomodoros: state.completedPomodoros + 1} : {...state, session: 'work'};
    case 'switch-to-work-session': return {...state, active: false, session: 'work', timeRemaining: workTimer};
    // case 'switch-to-break-session': return {...state, active: false, session: 'break', timeRemaining: breakTimer, completedPomodoros: state.completedPomodoros + 1};
    // case 'switch-to-big-break-session': return {...state, active: false, session: 'bigBreak', timeRemaining: bigBreakTimer ,completedPomodoros: state.completedPomodoros + 1};
    case 'switch-to-break-session': return {...state, active: false, session: 'break', timeRemaining: breakTimer};
    case 'switch-to-big-break-session': return {...state, active: false, session: 'bigBreak', timeRemaining: bigBreakTimer};
    case 'add-pomodoro': return {...state, completedPomodoros: state.completedPomodoros + 1};
    case 'schedule-countdown': return {...state, scheduledCountdown: action.scheduledCountdown};
    default: return state;
  }
}
//useReducer consolidates the many states
//when rewriting, replace the previous setStates, only this time, you're modifying properties of the big state object

function App() {
  const [state, dispatch] = useReducer(pomodoroReducer, initialTimer);

  const countdown = () => {
    if(state.active === true && state.timeRemaining > 0){
      dispatch({type: 'timer-counting-down'});
    }
  };

  const startTimer = ()=> {
    const interval  = setInterval(countdown, 1000);
    dispatch({type: 'start-timer', scheduledCountdown: interval});
  };

  const stopTimer = () => {
    clearInterval(state.scheduledCountdown);
    dispatch({type: 'stop-timer'});
  };

  useEffect(()=>{
    if(state.active === true && state.scheduledCountdown) {
      const interval  = setInterval(countdown, 1000);
      // setScheduledCountdown(interval);
      dispatch({type: 'schedule-countdown', scheduledCountdown: interval});
      return ()=> clearInterval(state.scheduledCountdown); 
    }

    if(state.timeRemaining === 0 && state.session === 'work'){
      dispatch({type: 'add-pomodoro'});
      if(state.completedPomodoros % 4 === 0){dispatch({type: 'switch-to-big-break-session'});}
      else {dispatch({type: 'switch-to-break-session'});}
    }

    if(state.timeRemaining === 0 && state.session === 'work' && state.completedPomodoros % 4 === 0){
      dispatch({type: 'switch-to-big-break-session'});
    } 
    
    if(state.timeRemaining === 0 && state.session === 'work' && state.completedPomodoros % 4 !== 0){
      dispatch({type: 'switch-to-break-session'});
    }
  }, [state.active, state.timeRemaining]);
  //error when including countdown, scheduledCountdown, state.session, 

  return ( 
    <div className="App">
      <h1>Pomodoro</h1>
      <p>{state.session}</p>
      <Pomodoros completedPomodoros={state.completedPomodoros}/>
      <Timer timeRemaining={state.timeRemaining} />
      <TimerControls startTimer={startTimer} stopTimer={stopTimer}/>
    </div>
  );
}

export default App;
