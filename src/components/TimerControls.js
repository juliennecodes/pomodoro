export function TimerControls({startTimer, stopTimer, pauseTimer, resetTimer}){
    return (
        <>
            <button onClick={startTimer}>Start</button>
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={resetTimer}>Reset</button>
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