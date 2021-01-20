export function TimerControls({active, startTimer, stopTimer}){
    if(active){
        return(<button onClick={stopTimer}>Stop</button>)
    } else {
        return(<button onClick={startTimer}>Start</button>)
    }
};
