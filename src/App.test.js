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

const breakTimerRegEx = new RegExp(stringTimer(breakTimer));


test('timer counts down', ()=>{
    jest.useFakeTimers();

    render(<App />);
    const startButton = screen.getByRole('button', {name: 'Start'});
    userEvent.click(startButton);
    
    act(()=>{jest.advanceTimersByTime(workTimerMs)});
    // jest.advanceTimersByTime(workTimerMs);

    expect(screen.getByText(breakTimerRegEx)).toBeInTheDocument();
    // screen.debug();
});

test('timer does not go past zero', () => {
    jest.useFakeTimers();
    render(<App />);
    const startButton = screen.getByRole('button', {name: 'Start'});
    userEvent.click(startButton);

    act(()=>{jest.advanceTimersByTime(workTimerMs + 1000)});

    expect(screen.getByText(breakTimerRegEx)).toBeInTheDocument();
    // screen.debug();
});

test('timer switches session when timer runs out', () => {
    jest.useFakeTimers();
    render(<App />);
    const startButton = screen.getByRole('button', {name: 'Start'});
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(workTimerMs)});

    expect(screen.getByText(/break/i)).toBeInTheDocument();
    // screen.debug();

    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(breakTimerMs)});
    expect(screen.getByText(/work/i)).toBeInTheDocument();
    // screen.debug();
});


test('when four work sessions are completed, session is changed to big break', ()=>{
    jest.useFakeTimers();
    render(<App />);
    const startButton = screen.getByRole('button', {name: 'Start'});
    
    // workBreakInterval(startButton);
    expect(screen.getByText(/work/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(workTimerMs)});
    expect(screen.getByText(/break/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(breakTimerMs)});

    expect(screen.getByText(/work/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(workTimerMs)});
    expect(screen.getByText(/break/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(breakTimerMs)});

    expect(screen.getByText(/work/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(workTimerMs)});
    expect(screen.getByText(/break/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(breakTimerMs)});

    expect(screen.getByText(/work/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(workTimerMs)});

    expect(screen.getByText(/big break/i)).toBeInTheDocument();
});

test('when big break timer runs out, work timer is displayed', ()=>{
    jest.useFakeTimers();
    render(<App />);
    const startButton = screen.getByRole('button', {name: 'Start'});
    
    // workBreakInterval(startButton);
    expect(screen.getByText(/work/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(workTimerMs)});
    expect(screen.getByText(/break/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(breakTimerMs)});

    expect(screen.getByText(/work/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(workTimerMs)});
    expect(screen.getByText(/break/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(breakTimerMs)});

    expect(screen.getByText(/work/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(workTimerMs)});
    expect(screen.getByText(/break/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(breakTimerMs)});

    expect(screen.getByText(/work/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(workTimerMs)});

    expect(screen.getByText(/big break/i)).toBeInTheDocument();
    userEvent.click(startButton);
    act(()=>{jest.advanceTimersByTime(bigBreakTimerMs)});

    expect(screen.getByText(/work/i)).toBeInTheDocument();


    
});
//------------------------------------------------------------------------------
function stringTimer(timeRemaining){
    const minutesRemaining = Math.floor(timeRemaining / 60);
    const secondsRemaining = timeRemaining % 60;

    const minutes = `${minutesRemaining}`.padStart(2, "0");
    const seconds = `${secondsRemaining}`.padStart(2, "0");

    return `${minutes}:${seconds}`;
}
