import './TimerControl.css';
export function TimerControl({active, session, startTimer, stopTimer, skipTimer, finished}){
    if(finished){
        return(<button className="timer-control">Start</button>)
    }

    if(active && session === 'work'){
        return(<button  className="timer-control" onClick={stopTimer}>Stop</button>)
    } 
    
    else if(active && (session === 'break' || session === 'big break')){
        return(<button className="timer-control" onClick={skipTimer}>Skip</button>)
    } 
    
    else {
        return(<button className="timer-control" onClick={startTimer}>Start</button>)
    }
};

