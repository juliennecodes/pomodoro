import {useState, useEffect} from 'react';
import {Pomodoros} from './components/Pomodoros';
import {Timer} from './components/Timer';
import { TimerControls } from './components/TimerControls';

// const workTimer = 1500;
// const breakTimer = 300;
// const bigBreakTimer = 1800;

const workTimer = 5;
const breakTimer = 2;
const bigBreakTimer = 5;

function App() {
  const [completedPomodoros, setCompletedPomodoros] = useState(2);
  const [session, setSession] = useState("work");
  const [timeRemaining, setTimeRemaining] = useState(workTimer);
  const [cleanupId, setCleanupId] = useState(null);
  const [timerState, setTimerState] = useState("inactive");

  const countdown = () => {
    if(timerState === "active" && timeRemaining > 0){
      const seconds = timeRemaining;
      setTimeRemaining(seconds - 1);
    }
  };

  const startTimer = ()=> {
    setTimerState("active");
    const interval  = setInterval(countdown, 1000);
    setCleanupId(interval);
  };

  const pauseTimer = () => {
    setTimerState("inactive");
    clearInterval(cleanupId);
  };

  const resetTimer = () => {
    setTimerState("inactive");
    clearInterval(cleanupId);
    setCleanupId(null);
    setTimeRemaining(workTimer);
  };

  const stopTimer = () => {
    setTimerState("inactive");
    clearInterval(cleanupId);
    setCleanupId(null);
  };

  useEffect(()=>{
    if(timerState === "active" && cleanupId) {
      const interval  = setInterval(countdown, 1000);
      setCleanupId(interval);
      return ()=> clearInterval(cleanupId); 
    }
  }, [timeRemaining, timerState]);
  //it says I am missing dependencies but when I do include the dependencies, cleanupId and countdown,
  //it creates an error saying maximum update depth exceeded

  useEffect(()=>{
    if(session === "work" && timeRemaining === 0){
      setCompletedPomodoros(completedPomodoros + 1);
    }
  }, [timerState, completedPomodoros, session, timeRemaining]);

  useEffect(()=>{
    if(timeRemaining === 0){
      setTimerState("inactive");
      if(session === "work"){
        if(completedPomodoros % 4 === 0){
          console.log(`completed pomodoros : ${completedPomodoros}`);
          setSession("bigBreak");
          setTimeRemaining(bigBreakTimer);
        } else {
          console.log(`completed pomodoros : ${completedPomodoros}`);
          setSession("break");
          setTimeRemaining(breakTimer);
        }
      }

      if(session === "break" || session === "bigBreak"){
        setSession("work");
        setTimeRemaining(workTimer);
      }
    }
  }, [timerState, timeRemaining, session, completedPomodoros]);

  return ( 
    <div className="App">
      <h1>Pomodoro</h1>
      <p>{session}</p>
      <Pomodoros completedPomodoros={completedPomodoros}/>
      <Timer timeRemaining={timeRemaining} />
      <TimerControls startTimer={startTimer} stopTimer={stopTimer} pauseTimer={pauseTimer} resetTimer={resetTimer}/>
    </div>
  );
}

export default App;
