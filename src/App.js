import {useState, useEffect} from 'react';
import {Pomodoros} from './components/Pomodoros';
import {Timer} from './components/Timer';
import { TimerControls } from './components/TimerControls';

function App() {
  const [completedPomodoros, setCompletedPomodoros] = useState(2);
  const [session, setSession] = useState("work");
  const [timeRemaining, setTimeRemaining] = useState(1500);
  const [cleanupId, setCleanupId] = useState(null);

  const countdown = () => {
    const seconds = timeRemaining;
    setTimeRemaining(seconds - 1);
  };

  const startTimer = ()=> {
    const interval  = setInterval(countdown, 1000);
    setCleanupId(interval);
  };

  const pauseTimer = () => {
    clearInterval(cleanupId);
  };

  const stopTimer = () => {
    clearInterval(cleanupId);
    setCleanupId(null);
    // if session is work, 
    setTimeRemaining(1500);
  };


  useEffect(()=>{
    if(cleanupId) {
      const interval  = setInterval(countdown, 1000);
      setCleanupId(interval);

      return ()=> clearInterval(cleanupId); 
    }
  }, [timeRemaining]);

  return ( 
    <div className="App">
      <h1>Pomodoro</h1>
      <Pomodoros completedPomodoros={completedPomodoros}/>
      <Timer timeRemaining={timeRemaining} />
      <TimerControls startTimer={startTimer} stopTimer={stopTimer} pauseTimer={pauseTimer}/>
    </div>
  );
}

export default App;
