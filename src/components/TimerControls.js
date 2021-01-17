export function TimerControls({startTimer, stopTimer}){
    return (
        <>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </>
    )
};

// export function TimerControls({countdown, startTimer, stopTimer}){
//     return (
//         <>
//             <button onClick={()=> {startTimer(); console.log("start button clicked")}}>Start</button>
//             <button onClick={()=> {stopTimer(); console.log("stop button clicked")}}>Stop</button>
//         </>
//     )
// };