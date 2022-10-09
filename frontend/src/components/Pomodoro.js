export function Pomodoro({filled}){
    if(filled) {
        return(
            <li className="pomodoro">
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="hsl(354, 59%, 57%)"
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12"/>
                </svg>
            </li>
        )
    } 
    
    else {
        return(
            <li className="pomodoro">
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="hsl(354, 59%, 57%)"
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24">
                    <path d="M12 1c6.065 0 11 4.935 11 11s-4.935 11-11 11-11-4.935-11-11 4.935-11 11-11zm0-1c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"/>
                </svg>
            </li>
            
        )
    }   
}

// export function Pomodoro(){
//     return(
//         <p>:)</p>
//     )
// }