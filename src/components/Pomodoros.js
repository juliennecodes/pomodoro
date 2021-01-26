import {Pomodoro} from './Pomodoro';

export function Pomodoros({session, completedPomodoros}){
    const finishedPomodoros = completedPomodoros % 4;

    if(session === 'big break'){
        return (
            <div className="pomodoros">
                <ul className="pomodorosUl">
                    {Array(4).fill(null).map(()=> <Pomodoro filled={true}/>)}
                </ul>
            </div>
        )
    }
    
    if(finishedPomodoros === 0) {
        return (
            <div className="pomodoros">
                <ul className="pomodorosUl">
                    {Array(4).fill(null).map(()=> <Pomodoro filled={false}/>)}
                </ul>
            </div>
        )
    }

    else if (finishedPomodoros === 1){
        return (
            <div className="pomodoros">
                <ul className="pomodorosUl">
                    {Array(1).fill(null).map(()=> <Pomodoro filled={true}/>)}
                    {Array(3).fill(null).map(()=> <Pomodoro filled={false}/>)}
                </ul>
            </div>
        )
    }

    else if (finishedPomodoros === 2) {
        return (
            <div className="pomodoros">
                <ul className="pomodorosUl">
                    {Array(2).fill(null).map(()=> <Pomodoro filled={true}/>)}
                    {Array(2).fill(null).map(()=> <Pomodoro filled={false}/>)}
                </ul>
            </div>
        )
    }
    
    else if (finishedPomodoros === 3) {
        return (
            <div className="pomodoros">
                <ul className="pomodorosUl">
                    {Array(3).fill(null).map(()=> <Pomodoro filled={true}/>)}
                    {Array(1).fill(null).map(()=> <Pomodoro filled={false}/>)}
                </ul>
            </div>
        )
    }
}

