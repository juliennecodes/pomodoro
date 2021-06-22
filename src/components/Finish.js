import './Finish.css';

function FinishedDialogue({completedPomodoros, resetTimer}){
    return(
        <div className="finished-dialogue-div">
            <div className="finished-dialogue">
                <svg className="close-icon"
                    data-testid='svg-close'
                    onClick={()=> resetTimer()} 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill='hsl(0, 0%, 100%)' 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24">
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                </svg>
                <p className="finished-text">You completed {completedPomodoros} pomodoros!</p>
            </div>
        </div>
    );
}

function FinishedQuestion({finishTheDay}){
    return (
        <p className="finished-question" onClick={()=> finishTheDay()}>Done for the day?</p>
    );
}

export function Finish({completedPomodoros, finished, finishTheDay, resetTimer}){
    if(finished){
        return <FinishedDialogue completedPomodoros={completedPomodoros} resetTimer={resetTimer}/>
    } else {
        return <FinishedQuestion finishTheDay={finishTheDay}/>
    }
    
}