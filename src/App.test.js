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

beforeEach(()=>{
    jest.useFakeTimers();
    render(<App />);
});

test('timer counts down', ()=>{
    const startButton = screen.getByRole('button', {name: 'Start'});
    
    workSession(startButton);
    expect(screen.getByText(/break/i)).toBeInTheDocument();
});

test('timer does not go past zero', () => {
    const startButton = screen.getByRole('button', {name: 'Start'});
    
    workSession(startButton);
    expect(screen.queryByText(/-1/)).not.toBeInTheDocument();
});

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

test('when big break timer runs out, work timer is displayed', ()=>{
    const startButton = screen.getByRole('button', {name: 'Start'});

    doXTimes(() => workAndBreakSession(startButton), 3);
    workSession(startButton);
    bigBreakSession(startButton);

    expect(screen.getByText(/work/i)).toBeInTheDocument();
});
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

