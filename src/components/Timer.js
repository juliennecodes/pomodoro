export function Timer({timeRemaining}){
    const minutesRemaining = Math.floor(timeRemaining / 60);
    const secondsRemaining = timeRemaining % 60;

    const minutes = `${minutesRemaining}`.padStart(2, "0");
    const seconds = `${secondsRemaining}`.padStart(2, "0");

    return(
        <p>{`${minutes}:${seconds}`}</p>
    )
}