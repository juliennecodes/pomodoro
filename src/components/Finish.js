import './Finish.css';

function FinishedDialogue({completedPomodoros}){
    return(
        <div className="finished-dialogue">
            <p className="finished-text">You completed {completedPomodoros} pomodoros!</p>
        </div>
    );
}

function FinishedQuestion({finishTheDay}){
    return (
        <p className="finished-question" onClick={()=> finishTheDay()}>Done for the day?</p>
    );
}

export function Finish({completedPomodoros, finished, finishTheDay}){
    if(finished){
        return <FinishedDialogue completedPomodoros={completedPomodoros}/>
    } else {
        return <FinishedQuestion finishTheDay={finishTheDay} />
    }
    
}