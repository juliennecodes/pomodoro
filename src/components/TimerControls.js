export function TimerControls({active, session, startTimer, stopTimer, skipTimer}){
    if(active && session === 'work'){
        return(<button onClick={stopTimer}>Stop</button>)
    } 
    else if(active && session === 'break'){
        return(<button onClick={skipTimer}>Skip</button>)

    } else {
        return(<button onClick={startTimer}>Start</button>)
    }
};
