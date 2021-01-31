import { act, render } from "@testing-library/react";
import App from "./App";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

const workTimer = 5;
const breakTimer = 2;
const bigBreakTimer = 5;

const workTimerMs = workTimer * 1000;
const breakTimerMs = breakTimer * 1000;
const bigBreakTimerMs = bigBreakTimer * 1000;

const regexWorkTimer = new RegExp(stringTimer(workTimer));

beforeAll(() => {
  jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => {});
});

beforeEach(() => {
  jest.useFakeTimers();
});

test("when work session ends, session is changed to break", () => {
  render(<App />);
  const startButton = screen.getByRole("button", { name: "Start" });

  finishOneWorkSession(startButton);

  expect(screen.getByText(/break/)).toBeInTheDocument();
});

test("when break session ends, session is changed to work", () => {
  render(<App />);
  const startButton = screen.getByRole("button", { name: "Start" });

  finishOneWorkSession(startButton);
  finishOneBreakSession(startButton);

  expect(screen.getByText(/work/)).toBeInTheDocument();
});

test("when four work sessions end, session is changed to big break", () => {
  render(<App />);
  const startButton = screen.getByRole("button", { name: "Start" });

  doXTimes(() => finishASetOfWorkAndBreakSession(startButton), 3);
  finishOneWorkSession(startButton);

  expect(screen.getByText(/big break/)).toBeInTheDocument();
});

test("when big break session ends, session is changed to work", () => {
  render(<App />);
  const startButton = screen.getByRole("button", { name: "Start" });

  doXTimes(() => finishASetOfWorkAndBreakSession(startButton), 3);
  finishOneWorkSession(startButton);
  finishOneBigBreakSession(startButton);

  expect(screen.getByText(/work/)).toBeInTheDocument();
});

test("start button is replaced with stop button when clicked during work sessions", () => {
  render(<App />);
  const startButton = screen.getByRole("button", { name: "Start" });

  userEvent.click(startButton);

  expect(screen.queryByText(/Start/)).not.toBeInTheDocument();
  expect(screen.getByText(/Stop/)).toBeInTheDocument();
});

test("start button is replaced with skip button during break sessions", () => {
  render(<App />);
  const startButton = screen.getByRole("button", { name: "Start" });

  finishOneWorkSession(startButton);

  expect(screen.getByText(/break/)).toBeInTheDocument();

  userEvent.click(startButton);

  expect(screen.queryByText(/Start/)).not.toBeInTheDocument();
  expect(screen.getByText(/Skip/)).toBeInTheDocument();
});

test("start button is replaced with skip button during big break sessions", () => {
  render(<App />);
  const startButton = screen.getByRole("button", { name: "Start" });

  doXTimes(() => finishASetOfWorkAndBreakSession(startButton), 3);
  finishOneWorkSession(startButton);

  expect(screen.getByText(/big break/)).toBeInTheDocument();
  expect(screen.getByText(/Start/)).toBeInTheDocument();

  userEvent.click(startButton);

  expect(screen.queryByText(/Start/)).not.toBeInTheDocument();
  expect(screen.getByText(/Skip/)).toBeInTheDocument();
});

test("stop button resets the timer when the work session is interrupted", () => {
  render(<App />);
  const startButton = screen.getByRole("button", { name: "Start" });

  userEvent.click(startButton);
  act(() => jest.advanceTimersByTime(1000));

  expect(screen.getByText(/Stop/)).toBeInTheDocument();

  const stopButton = screen.getByRole("button", { name: "Stop" });

  userEvent.click(stopButton);

  expect(screen.getByText(regexWorkTimer)).toBeInTheDocument();
});

test("skip button skips the break session", () => {
  render(<App />);
  const startButton = screen.getByRole("button", { name: "Start" });

  finishOneWorkSession(startButton);

  expect(screen.getByText(/break/)).toBeInTheDocument();

  userEvent.click(startButton);
  act(() => jest.advanceTimersByTime(1000));

  expect(screen.getByText(/Skip/)).toBeInTheDocument();

  const skipButton = screen.getByRole("button", { name: "Skip" });

  userEvent.click(skipButton);

  expect(screen.getByText(/work/)).toBeInTheDocument();
});

test("skip button skips the big break session", () => {
  render(<App />);
  const startButton = screen.getByRole("button", { name: "Start" });

  doXTimes(() => finishASetOfWorkAndBreakSession(startButton), 3);
  finishOneWorkSession(startButton);

  expect(screen.getByText(/big break/)).toBeInTheDocument();

  userEvent.click(startButton);
  act(() => jest.advanceTimersByTime(1000));

  expect(screen.getByText(/Skip/)).toBeInTheDocument();

  const skipButton = screen.getByRole("button", { name: "Skip" });

  userEvent.click(skipButton);

  expect(screen.getByText(/work/)).toBeInTheDocument();
});

test('when user clicks done for the day, a dialogue pops up saying you completed x pomodoros', () => {
  render(<App />);
  const startButton = screen.getByRole('button', {name: 'Start'});

  doXTimes(() => finishASetOfWorkAndBreakSession(startButton), 3);

  const finishButton = screen.getByText(/done for the day/i);

  userEvent.click(finishButton);

  expect(screen.getByText(/you completed 3 pomodoros/i)).toBeInTheDocument();
});

test('when user closes the finished dialogue, timer resets', ()=>{
  render(<App />);
  const startButton = screen.getByRole('button', {name: 'Start'});

  finishOneWorkSession(startButton);

  // expect(screen.getByText(/break/)).toBeInTheDocument();
  //calls attention that it is break, but it doesn't help, nothing about test scenario talks about breaks
  //focus on what you're trying to prove
  //complete the day, start a new day
  //shouldn't be pomodoros for free, prove that you've reset your total count after closing the dialogue
  //anything that you can strip out of here that doesn't directly impact or reinforce is not necessary in the test

  let finishButton = screen.getByText(/done for the day/i);
  
  userEvent.click(finishButton);

  expect(screen.getByText(/you completed 1 pomodoros/i)).toBeInTheDocument();

  const closeButton = screen.getByTestId('svg-close');

  userEvent.click(closeButton);

  expect(screen.queryByText(/you completed 1 pomodoros/i)).not.toBeInTheDocument();
  expect(screen.getByText(/work/)).toBeInTheDocument();
  expect(screen.getByText(regexWorkTimer)).toBeInTheDocument();

  finishButton = screen.getByText(/done for the day/i);
  //this is a bit odd, I wanted to click on the done for the day button again just to make sure the state resets
  //however, because the finish button element disappears from the DOM, its previous reference also disappears
  //so I have to assign a new reference
  //is this too mindful of the implementation?

  userEvent.click(finishButton);

  expect( screen.getByText(/you completed 0 pomodoros/i)).toBeInTheDocument();  
});

//------------------------------------------------------------------------------
function doXTimes(callback, x) {
  for (let i = 0; i < x; i++) {
    callback();
  }
}

function finishASetOfWorkAndBreakSession(startButton) {
  finishOneWorkSession(startButton);
  finishOneBreakSession(startButton);
}

function finishOneWorkSession(startButton) {
  expect(screen.getByText(/work/)).toBeInTheDocument();
  userEvent.click(startButton);
  act(() => {
    jest.advanceTimersByTime(workTimerMs);
  });
}

function finishOneBreakSession(startButton) {
  expect(screen.getByText(/break/)).toBeInTheDocument();
  userEvent.click(startButton);
  act(() => {
    jest.advanceTimersByTime(breakTimerMs);
  });
}

function finishOneBigBreakSession(startButton) {
  expect(screen.getByText(/big break/)).toBeInTheDocument();
  userEvent.click(startButton);
  act(() => {
    jest.advanceTimersByTime(bigBreakTimerMs);
  });
}

function stringTimer(timeRemaining) {
  const minutesRemaining = Math.floor(timeRemaining / 60);
  const secondsRemaining = timeRemaining % 60;

  const minutes = `${minutesRemaining}`.padStart(2, "0");
  const seconds = `${secondsRemaining}`.padStart(2, "0");

  return `${minutes}:${seconds}`;
}