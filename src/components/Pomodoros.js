import {Pomodoro} from './Pomodoro';
import { PomodoroSlot } from './PomodoroSlot';

export function Pomodoros({session, completedPomodoros}){
    if(session === 'big break'){
        const finishedPomodoros = 4;
        return (
            <div className="pomodoros">
                <ul className="pomodoro-slots">
                    {Array(4).fill(null).map((x, i)=> <PomodoroSlot key = {i}/> )}
                </ul>

                <ul className="filled-pomodoros">
                    {Array(finishedPomodoros).fill(null).map((x, i) => <Pomodoro key = {i}/>)}
                </ul>

            </div>
               
        )

    } else {
        const finishedPomodoros = completedPomodoros % 4; 
        return (
            <div className="pomodoros">
                <ul className="pomodoro-slots">
                    {Array(4).fill(null).map((x, i)=> <PomodoroSlot key = {i}/> )}
                </ul>
                <ul className="filled-pomodoros">
                    {Array(finishedPomodoros).fill(null).map((x, i) => <Pomodoro key = {i}/>)}
                </ul>
            </div>
                
        )
    }
}

//for each pomodoro, fill or not filled
//for loop
//loop 1 - 4, for each, if current index is less than finished pomodoros, create filled pomodoro
//pass as prop in single component, svg as circle or svg as path


