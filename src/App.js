import {useEffect, useReducer} from 'react';
import {Pomodoros} from './components/Pomodoros';
import {Timer} from './components/Timer';
import { TimerControls } from './components/TimerControls';
import notification from './assets/notification.wav';

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
  completedPomodoros: 0,
  scheduledCountdown: null,
};

const notificationAudio = new Audio(notification);
const playSound = (sound) => {
  sound.play();
};

const pomodoroReducer = (state, action) => {
  if(action.type === 'time-decrease'){
    if(state.timeRemaining - 1 <  0) return {...state};
    return {...state, timeRemaining: state.timeRemaining - 1};
  }

  if(action.type === 'start-timer'){
    return {...state, active: true, scheduledCountdown: action.scheduledCountdown};
  }

  if(action.type === 'stop-timer'){
    return {...state, active: false, timeRemaining: workTimer, scheduledCountdown: null};
  }

  if(action.type === 'skip-timer'){
    return {...state, active: false, session: 'work', timeRemaining: workTimer, scheduledCountdown: null};
  }  

  if(action.type === 'switch-session'){
    if(state.session === 'work'){
      if((state.completedPomodoros + 1) % 4 === 0){
        //I'm not sure about this
        //I like the previous explicit declaration that you add a pomodoro once you complete a work session
        //but that is extra code in useEffect
        //this way of doing things is less code in useEffect and the bulk of calculating is done in the reducer function
        //however, I'm not sure if it's descriptive enough
        //it is adding the pomodoro before it is added
        //I guess it's in the same vein of thinking as if(state.timeRemaining - 1 <  0) return {...state};
        //hmmm, what are my qualms about it,
        //is it using the future result before you actually enact it?
        //will I remember why I wrote this
        //at least with the time remaining - 1, it seems pretty straightforward, if you can't decrease the time, then don't
        //in this case, the main idea is switching session, the added pomodoro is just an incidental
        return {...state, active: false, session: 'big break', timeRemaining: bigBreakTimer, completedPomodoros: state.completedPomodoros + 1};
      } else {
        return {...state, active: false, session: 'break', timeRemaining: breakTimer, completedPomodoros: state.completedPomodoros + 1};
      }
    }

    if(state.session === 'break' || state.session === 'big break'){
      return {...state, active: false, session: 'work', timeRemaining: workTimer};
    }
  }
}

function App() {
  const [timer, dispatch] = useReducer(pomodoroReducer, initialTimer);

  const countdown = () => {
    dispatch({type: 'time-decrease'});
  };

  const startTimer = () => {
    const scheduledCountdown = setInterval(countdown, 1000);
    dispatch({type: 'start-timer', scheduledCountdown: scheduledCountdown});
  };

  const stopTimer = () => {
    clearInterval(timer.scheduledCountdown);
    dispatch({type: 'stop-timer'});
  }

  const skipTimer = () => {
    clearInterval(timer.scheduledCountdown);
    dispatch({type: 'skip-timer'});
  };

  useEffect( () =>{
    if(timer.timeRemaining === 0){
      clearInterval(timer.scheduledCountdown);
      playSound(notificationAudio);
      dispatch({type: 'switch-session'});
    }
  });

  return ( 
    <div className="App">
      <h1 className="title">Pomodoro</h1>
      <p className="session">{timer.session}</p>
      <Pomodoros session={timer.session} completedPomodoros={timer.completedPomodoros}/>
      <Timer timeRemaining={timer.timeRemaining} />
      <TimerControls active={timer.active} session={timer.session} startTimer={startTimer} stopTimer={stopTimer} skipTimer={skipTimer}/>
    </div>
  );
}

export default App;
