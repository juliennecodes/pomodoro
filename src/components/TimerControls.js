// export function TimerControls({active, session, startTimer, stopTimer, skipTimer}){
//     if(active && session === 'work'){
//         return(<button  className="timer-control" onClick={stopTimer}>Stop</button>)
//     } 
//     else if(active && session === 'break'){
//         return(<button className="timer-control" onClick={skipTimer}>Skip</button>)
//     }
//     else if(active && session === 'big break'){
//         return(<button className="timer-control" onClick={skipTimer}>Skip</button>)
//     } else {
//         return(<button className="timer-control" onClick={startTimer}>Start</button>)
//     }
// };

export function TimerControls({active, session, startTimer, stopTimer, skipTimer}){
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