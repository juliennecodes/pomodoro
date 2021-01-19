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


test('timer counts down', ()=>{
    jest.useFakeTimers();

    render(<App />);
    const startButton = screen.getByRole('button', {name: 'Start'});
    userEvent.click(startButton);
    
    
    act(()=>{jest.advanceTimersByTime(workTimerMs)});
    // jest.advanceTimersByTime(workTimerMs);

    expect(screen.getByText(/00:00/)).toBeInTheDocument();
    // screen.debug();
});

test('timer does not go past zero', () => {
    jest.useFakeTimers();
    render(<App />);
    const startButton = screen.getByRole('button', {name: 'Start'});
    userEvent.click(startButton);

    act(()=>{jest.advanceTimersByTime(workTimerMs + 1000)});

    expect(screen.getByText(/00:00/)).toBeInTheDocument();
    // screen.debug();
});
