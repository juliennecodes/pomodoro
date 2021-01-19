import {Pomodoro} from './Pomodoro';

export function Pomodoros({completedPomodoros}){
    const finishedPomodoros = completedPomodoros % 4; 
    return (
        <div>
            {console.log(`completed pomodoros : ${completedPomodoros}`)}
            <ul className="completed-pomodoros">
                {Array(finishedPomodoros).fill(null).map((x, i) => <Pomodoro key = {i}/>)}
            </ul>
        </div>
    )
}