import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    isTimerOn: false,
    lastValue: null,
    results: [],
    resultsForTimer: [],
    startValue: null,
  };
  
  export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
      setHours: (state, action) => { state.hours = action.payload; },
      setMinutes: (state, action) => { state.minutes = action.payload; },
      setSeconds: (state, action) => { state.seconds = action.payload; },
      setIsTimerOn: (state, action) => {
        state.isTimerOn = action.payload;
      },
      setLastValue: (state, action) => {
        state.lastValue = action.payload;
      },
      increment: (state, action) => {
        const { field } = action.payload;
        if (state.hasOwnProperty(field)) {
          state[field] += 1;
        }
      },
      decrement: (state, action) => {
        const { field } = action.payload;
        if (state.hasOwnProperty(field)) {
          state[field] -= 1;
        }
      },
      timer: (state) => {
        if(state.seconds > 0) {
          state.seconds -= 1;
        }
        else if(state.minutes > 0) {
          state.seconds = 59;
          state.minutes -= 1;
        }
        else if(state.hours > 0) {
          state.seconds = 59;
          state.minutes = 59;
          state.hours -= 1;
        }
        else {
          clearInterval(state.lastValue);
          state.isTimerOn = false;
          state.lastValue = null;
          if (state.startValue) {
            state.resultsForTimer.push(state.startValue);
          }
          alert("Finish");
        }
      },
      startTimer: (state, action) => {
        state.isTimerOn = true;
        state.lastValue = action.payload;
        state.startValue = `${state.hours}:${state.minutes}:${state.seconds}`;
      },
      stopTimer: (state) => {
        state.isTimerOn = false;
        clearInterval(state.lastValue);
      },
      stopwatch: (state) => {
        if(state.seconds < 59) {
          state.seconds += 1;
        }
        else {
          state.seconds = 0;
          if(state.minutes < 59) {
            state.minutes += 1;
          }
          else {
            state.minutes = 0;
            state.hours += 1;
          }
        }
      },
      addResult: (state, action) => {
        state.results.push(action.payload);
      },
      addResultForTimer: (state, action) => {
        state.resultsForTimer.push(action.payload);
      },
    },
  });
  
  export const { 
    setHours, 
    setMinutes, 
    setSeconds, 
    setIsTimerOn, 
    setLastValue,
    increment,
    decrement,
    timer,
    startTimer,
    stopTimer,
    stopwatch,
    addResult,
    addResultForTimer
  } = timerSlice.actions;
  
  export default timerSlice.reducer;