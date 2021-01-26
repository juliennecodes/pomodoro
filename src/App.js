import { useEffect, useReducer } from "react";
import { Pomodoros } from "./components/Pomodoros";
import { Timer } from "./components/Timer";
import { TimerControls } from "./components/TimerControls";
import notification from "./assets/notification.wav";

// const workTimer = 1500;
// const breakTimer = 300;
// const bigBreakTimer = 1800;

const workTimer = 5;
const breakTimer = 2;
const bigBreakTimer = 5;

const initialTimer = {
  active: false,
  session: "work",
  timeRemaining: workTimer,
  completedPomodoros: 0,
  scheduledCountdown: null,
};

const notificationAudio = new Audio(notification);
const playSound = (sound) => {
  sound.play();
};

// const pomodoroReducer = (state, action) => {
//   if(action.type === 'time-decrease'){
//     if(state.timeRemaining - 1 <  0) return {...state};
//     return {...state, timeRemaining: state.timeRemaining - 1};
//   }

//   if(action.type === 'start-timer'){
//     return {...state, active: true, scheduledCountdown: action.scheduledCountdown};
//   }

//   if(action.type === 'stop-timer'){
//     return {...state, active: false, timeRemaining: workTimer, scheduledCountdown: null};
//   }

//   if(action.type === 'skip-timer'){
//     return {...state, active: false, session: 'work', timeRemaining: workTimer, scheduledCountdown: null};
//   }

//   if(action.type === 'switch-to-work-session'){
//     return {...state, active: false, timeRemaining: workTimer, session: 'work'};
//   }

//   if(action.type === 'switch-to-break-session'){
//     if(state.completedPomodoros % 4 === 0){
//       return {...state, active: false, timeRemaining: bigBreakTimer, session: 'big break'};
//     } else {
//       return {...state, active: false, timeRemaining: breakTimer ,session: 'break'};
//     }
//   }

//   if(action.type === 'add-pomodoro'){
//     return {...state, completedPomodoros: state.completedPomodoros + 1};
//   }
// }

const pomodoroReducer = (state, action) => {
  if (action.type === "time-decrease") {
    if (state.timeRemaining - 1 > 0) {
      return { ...state, timeRemaining: state.timeRemaining - 1 };
    } else {
      if (state.session === "work") {
        const completedPomodoros = state.completedPomodoros + 1;
        if (completedPomodoros % 4 === 0) {
          return {
            ...state,
            completedPomodoros,
            active: false,
            timeRemaining: bigBreakTimer,
            session: "big break",
          };
        } else {
          return {
            ...state,
            completedPomodoros,
            active: false,
            timeRemaining: breakTimer,
            session: "break",
          };
        }
      }
      if (state.session === "break" || state.session === "big break") {
        return {
          ...state,
          active: false,
          timeRemaining: workTimer,
          session: "work",
        };
      }
    }
  }

  if (action.type === "start-timer") {
    return {
      ...state,
      active: true,
      scheduledCountdown: action.scheduledCountdown,
    };
  }
  if (action.type === "stop-timer") {
    return {
      ...state,
      active: false,
      timeRemaining: workTimer,
      scheduledCountdown: null,
    };
  }

  if (action.type === "skip-timer") {
    return {
      ...state,
      active: false,
      session: "work",
      timeRemaining: workTimer,
      scheduledCountdown: null,
    };
  }
};

function App() {
  const [timer, dispatch] = useReducer(pomodoroReducer, initialTimer);

  const countdown = () => {
    dispatch({ type: "time-decrease" });
  };

  const startTimer = () => {
    const scheduledCountdown = setInterval(countdown, 1000);
    dispatch({ type: "start-timer", scheduledCountdown: scheduledCountdown });
  };

  const stopTimer = () => {
    clearInterval(timer.scheduledCountdown);
    dispatch({ type: "stop-timer" });
  };

  const skipTimer = () => {
    clearInterval(timer.scheduledCountdown);
    dispatch({ type: "skip-timer" });
  };

  // useEffect(() => {
  //   // if (timer.timeRemaining === 0) {
  //     // clearInterval(timer.scheduledCountdown);
  //     playSound(notificationAudio);

  //     // if (timer.session === "work") {
  //     //   dispatch({ type: "add-pomodoro" });
  //     //   dispatch({ type: "switch-to-break-session" });
  //     // }

  //     // if (timer.session === "break" || timer.session === "big break") {
  //     //   dispatch({ type: "switch-to-work-session" });
  //     // }
  //     //now handled in the reducer
  //   // }
  //   return () =>{
  //     clearInterval(timer.scheduledCountdown);
  //   };
  // }, [timer.session]);

  // useEffect(()=>{
  //   return () =>{
  //     clearInterval(timer.scheduledCountdown);
  //   };
  //   //intent of this one is to have a cleanup function, because the test error was trying to call dispatch in countdown
  //   //even though the component itself was already unmounted, indicates cleanup missing, react hints that something
  //   //hasn't been removed when it should be removed, 
  //   //test running, timer is counting down, result of every tick in timer is countdown, time decrease but component
  //   //is unmounted but no cleanup that says you should clear interval
  //   //so far clear interval handles timer reaches zero, timer stops, timer skip - cases where clear interval handles
  //   //in tests, you may not hit those points but it isn't going to hit zero, stop, or skip
  //   //you need something to stop timer in tests
  // }, [timer.scheduledCountdown]);

  useEffect(() => {
    clearInterval(timer.scheduledCountdown);
    playSound(notificationAudio);
  }, [timer.session]);

  useEffect(() => {
    // clearInterval(timer.scheduledCountdown); //wouldn't run when component is unmounted
    return () => clearInterval(timer.scheduledCountdown);
    //makes sure it's run even when component unmounts
  }, [timer.scheduledCountdown]);

  return (
    <div className="App">
      <h1 className="title">Pomodoro</h1>
      <p className="session">{timer.session}</p>
      <Pomodoros
        session={timer.session}
        completedPomodoros={timer.completedPomodoros}
      />
      <Timer timeRemaining={timer.timeRemaining} />
      <TimerControls
        active={timer.active}
        session={timer.session}
        startTimer={startTimer}
        stopTimer={stopTimer}
        skipTimer={skipTimer}
      />
    </div>
  );
}

export default App;
