import { act, render } from '@testing-library/react';
import App from './App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';

const workTimer = 5;
const breakTimer = 2;
const bigBreakTimer = 5;

const workTimerMs = workTimer * 1000;
const breakTimerMs = breakTimer * 1000;
const bigBreakTimerMs = bigBreakTimer * 1000;

const regexWorkTimer = new RegExp(stringTimer(workTimer));

beforeAll(()=>{
    jest.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(() => {});
});
//when I call play on an HTML media element, don't do anything
//play is trying to do something
//that something is not implemented in the test environment
//it is implemented in the browser but not in node
//mock code replaces code in app so test doesn't create an error

beforeEach(()=>{
    jest.useFakeTimers();
    render(<App />);
});

// test('timer counts down', ()=>{
//     const startButton = screen.getByRole('button', {name: 'Start'});
    
//     workSession(startButton);
//     expect(screen.getByText(/break/i)).toBeInTheDocument();
// });
//identical to other test, just different name
//the other one is better because it talks about pomodoro

test('timer does not go past zero', () => {
    const startButton = screen.getByRole('button', {name: 'Start'});
    
    workSession(startButton);
    expect(screen.queryByText(/-1/)).not.toBeInTheDocument();
});
//if you broke the application and it goes to -1, it might be caught by other tests

test('when work session ends, session is changed to break', ()=>{
    const startButton = screen.getByRole('button', {name: 'Start'});

    workSession(startButton);
    expect(screen.getByText(/break/i)).toBeInTheDocument();
});

test('when break session ends, session is changed to work', ()=>{
    const startButton = screen.getByRole('button', {name: 'Start'});

    workSession(startButton);
    breakSession(startButton);
    expect(screen.getByText(/work/i)).toBeInTheDocument();
});

test('when four work sessions are completed, session is changed to big break', ()=>{
    const startButton = screen.getByRole('button', {name: 'Start'});
    
    doXTimes(() => workAndBreakSession(startButton), 3);
    workSession(startButton);

    expect(screen.getByText(/big break/i)).toBeInTheDocument();
});
//ends vs completed - stay consistent
//helps visually, see logical groupings because of similar phrasing

test('when big break timer runs out, work timer is displayed', ()=>{
    const startButton = screen.getByRole('button', {name: 'Start'});

    doXTimes(() => workAndBreakSession(startButton), 3);
    workSession(startButton);
    bigBreakSession(startButton);

    expect(screen.getByText(/work/i)).toBeInTheDocument();
});

test('start button is replaced with stop button when clicked during work sessions', () => {
    const startButton = screen.getByRole('button', {name: 'Start'});

    expect(screen.getByText(/Start/)).toBeInTheDocument();
    userEvent.click(startButton);
    expect(screen.queryByText(/Start/)).not.toBeInTheDocument();
    expect(screen.getByText(/Stop/)).toBeInTheDocument();

});

test('start button is replaced with skip button during break sessions', ()=>{
    const startButton = screen.getByRole('button', {name: 'Start'});

    workSession(startButton);
    expect(screen.getByText(/Start/)).toBeInTheDocument();
    userEvent.click(startButton);
    expect(screen.queryByText(/Start/)).not.toBeInTheDocument();
    expect(screen.getByText(/Skip/)).toBeInTheDocument();
});

test('stop button resets the timer when the work session is interrupted', ()=>{
    const startButton = screen.getByRole('button', {name: 'Start'});

    expect(screen.getByText(/work/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=> jest.advanceTimersByTime(1000));
    expect(screen.getByText(/Stop/)).toBeInTheDocument();

    const stopButton = screen.getByRole('button', {name: 'Stop'});
    userEvent.click(stopButton);

    expect(screen.getByText(regexWorkTimer)).toBeInTheDocument();

});

test('skip button skips the break session', ()=>{
    const startButton = screen.getByRole('button', {name: 'Start'});

    workSession(startButton);
    expect(screen.getByText(/break/)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=> jest.advanceTimersByTime(1000));
    expect(screen.getByText(/Skip/)).toBeInTheDocument();

    const skipButton = screen.getByRole('button', {name: 'Skip'});
    userEvent.click(skipButton);

    expect(screen.getByText(/work/)).toBeInTheDocument();
});

// workAndBreakSession(startButton)
//returns void, does something
//evaluates first, 
//passes undefined as first argument
//give doXTimes a function that calls workAndBreakSession
//here is an argument that when you call it calls workAndBreakSession
//callback evaluates to calling workAndBreak session

test('skip button skips big break session', ()=> {
    const startButton = screen.getByRole('button', {name: 'Start'});
    doXTimes(()=>workAndBreakSession(startButton) , 3);
    workSession(startButton);
    expect(screen.getByText(/big break/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=> jest.advanceTimersByTime(1000));
    expect(screen.getByText(/Skip/)).toBeInTheDocument();

    const skipButton = screen.getByRole('button', {name: 'Skip'});
    userEvent.click(skipButton);

    expect(screen.getByText(/work/)).toBeInTheDocument();

})
//------------------------------------------------------------------------------
function doXTimes(callback, x){
    for (let i = 0; i < x; i++) {
        callback();
    }
}

function workAndBreakSession(startButton){
    workSession(startButton);
    breakSession(startButton);
}

function workSession(startButton){
    expect(screen.getByText(/work/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(workTimerMs)});
};

function breakSession(startButton){
    expect(screen.getByText(/break/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(breakTimerMs)});
}

function bigBreakSession(startButton){
    expect(screen.getByText(/big break/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(bigBreakTimerMs)});
}

function stringTimer(timeRemaining){
    const minutesRemaining = Math.floor(timeRemaining / 60);
    const secondsRemaining = timeRemaining % 60;

    const minutes = `${minutesRemaining}`.padStart(2, "0");
    const seconds = `${secondsRemaining}`.padStart(2, "0");

    return `${minutes}:${seconds}`;
}