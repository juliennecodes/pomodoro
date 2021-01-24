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