import {Pomodoro} from './Pomodoro';
import './Pomodoros.css';

export function Pomodoros({session, completedPomodoros}){
    if(session === 'big break'){
        return (
            <div className="pomodoros">
                <ul className="pomodorosUl">
                    {Array(4).fill(null).map((currentValue, n)=> <Pomodoro filled={true} key={n}/>)}
                </ul>
            </div>
        )
    }

    const finishedPomodoros = completedPomodoros % 4;
    for(let i = 0; i < 4; i++){
        if(i === finishedPomodoros){
            return (
                <div className="pomodoros">
                    <ul className="pomodorosUl">
                        {Array(i).fill(null).map((currentValue, n)=> <Pomodoro filled={true} key={n}/>)}
                        {Array(4 - i).fill(null).map((currentValue, n)=> <Pomodoro filled={false} key={n}/>)}
                    </ul>
                </div>
            )
        }
    }
}

