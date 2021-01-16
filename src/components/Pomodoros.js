import {Pomodoro} from './Pomodoro';

// export function Pomodoros({completedPomodoros}){
//     const finishedPomodoros = completedPomodoros % 4; 
//     return (
//         <div>
//             <ul>
//                 {Array(finishedPomodoros).fill(<Pomodoro/>)}
//             </ul>
//         </div>
//     )
// }

// export function Pomodoros({completedPomodoros}){
//     const finishedPomodoros = completedPomodoros % 4; 
//     return (
//         <div>
//             <ul>
//                 {Array(finishedPomodoros).map((x, i) => <Pomodoro key = {i}/>)}
//             </ul>
//         </div>
//     )
// }

export function Pomodoros({completedPomodoros}){
    const finishedPomodoros = completedPomodoros % 4; 
    return (
        <div>
            <ul className="completed-pomodoros">
                {Array(finishedPomodoros).fill(null).map((x, i) => <Pomodoro key = {i}/>)}
            </ul>
        </div>
    )
}