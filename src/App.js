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
