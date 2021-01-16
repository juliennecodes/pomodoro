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

  // const countdown = useCallback(()=>{
  //   const seconds = timeRemaining;
  //   setTimeRemaining(seconds - 1);
  // }, [timeRemaining]);

  const startTimer = ()=> {
    const seconds = timeRemaining;
    // setTimeout(setTimeRemaining(seconds - 1), 1000);
    // setTimeout(()=> setTimeRemaining(seconds - 1), 1000);
    const interval  = setInterval(()=> setTimeRemaining(seconds - 1), 1000);
    setCleanupId(interval);
    console.log(`this is the start timer, interval is ${interval}, cleanupId is ${cleanupId}`);
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
      console.log("effect taking place");
      const seconds = timeRemaining;
      // const interval  = setInterval(setTimeRemaining(seconds - 1), 1000);
      const interval  = setInterval(()=> setTimeRemaining(seconds - 1), 1000);
      // const interval  = setInterval(()=> {setTimeRemaining(seconds - 1); console.log("effect taking place")}, 1000);

      // setCleanupId(setInterval(()=> setTimeRemaining(seconds - 1), 1000));
      setCleanupId(interval);

      // console.log(`from useEffect, interval is ${interval}, this is the scheduled effect? `);
      // console.log(`from useEffect, cleanup id is ${cleanupId}`);
      // return clearInterval(interval);
      // return ()=>{clearInterval(interval)};
      // return () => clearInterval(cleanupId);
      return ()=>{
        console.log("cleanup taking place")
        // console.log(`from cleanup, cleaning up ${cleanupId}`);
        clearInterval(cleanupId);
      };
    }
    
  }, [timeRemaining]);

  return ( 
    <div className="App">
      <h1>Pomodoro</h1>
      <Pomodoros completedPomodoros={completedPomodoros}/>
      <Timer timeRemaining={timeRemaining} />
      <TimerControls countdown={countdown} startTimer={startTimer} stopTimer={stopTimer} pauseTimer={pauseTimer}/>
    </div>
  );
}

export default App;
