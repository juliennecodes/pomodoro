import {Pomodoro} from './Pomodoro';

export function Pomodoros({session, completedPomodoros}){
    if(session === 'big break'){
        const finishedPomodoros = 4;
        return (
            <div>
                <ul className="completed-pomodoros">
                    {Array(finishedPomodoros).fill(null).map((x, i) => <Pomodoro key = {i}/>)}
                </ul>
            </div>
        )

    } else {
        const finishedPomodoros = completedPomodoros % 4; 
        return (
            <div>
                <ul className="completed-pomodoros">
                    {Array(finishedPomodoros).fill(null).map((x, i) => <Pomodoro key = {i}/>)}
                </ul>
            </div>
        )
    }
}