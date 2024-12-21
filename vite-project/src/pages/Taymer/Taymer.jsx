import React, { useState } from 'react'
import css from "./Taymer.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, setHours, setMinutes, setSeconds } from '../../features/timerSlice';

export default function Taymer() {

  const dispatch = useDispatch();
  const hours = useSelector((state) => state.timer.hours);
  const minutes = useSelector((state) => state.timer.minutes);
  const seconds = useSelector((state) => state.timer.seconds);
  const isTimerOn = useSelector((state) => state.timer.isTimerOn);
  const results = useSelector((state) => state.timer.resultsForTimer);

  const handleClickHours = (e) => {
    const value = parseInt(e.target.value);
    dispatch(setHours(value + 1));
  }

  const handleClickMinutes = (e) => {
    const value = parseInt(e.target.value);
    if(value < 59) {
      dispatch(setMinutes(value + 1));
    }
    else if (value === 59){
      dispatch(setMinutes(0));
      dispatch(setHours(parseInt(hours) + 1));
    }
  }

  const handleClickSeconds = (e) => {
    const value = parseInt(e.target.value);
    if(value < 59) {
      dispatch(setSeconds(value + 1));
    }
    else if (value === 59){
      dispatch(setSeconds(0));
      dispatch(setMinutes(parseInt(minutes) + 1));
      if(parseInt(minutes) === 59){
        dispatch(setMinutes(0));
        dispatch(setHours(parseInt(hours) + 1));
      }
    }
  }

  const handleChangeHours = (e) => {
    dispatch(setHours((e.target.value)));
  }
  const handleChangeMinutes = (e) => {
    const value = e.target.value;
    if(value < 60) {
      dispatch(setMinutes(value));
    }
  }
  const handleChangeSeconds = (e) => {
    const value = e.target.value;
    if(value < 60) {
      dispatch(setSeconds(value));
    }
  }

  return (
    <div className = {css.container}>
      <div className = {css.inputs}>
        <input pattern="[0-9]*" value = {hours} className = {css.input} type = "text" onChange={handleChangeHours} disabled = {isTimerOn} onClick={handleClickHours} />
        <div className={css.buttons}>
            <button disabled = {isTimerOn} className = {css.button} onClick={() => dispatch(increment({field: "hours"}))}>+</button>
            <button disabled = {isTimerOn} className = {css.button} onClick={() => dispatch(decrement({field: "hours"}))}>-</button>
        </div>
        <input pattern="[0-9]*" value = {minutes} className = {css.input} type = "text" onChange={handleChangeMinutes} disabled = {isTimerOn || minutes >= 60} onClick={handleClickMinutes} />
        <div className={css.buttons}>
            <button disabled = {isTimerOn} className = {css.button} onClick={() => dispatch(increment({field: "minutes"}))}>+</button>
            <button disabled = {isTimerOn} className = {css.button} onClick={() => dispatch(decrement({field: "minutes"}))}>-</button>
        </div>
        <input pattern="[0-9]*" value = {seconds} className = {css.input} type = "text" onChange={handleChangeSeconds} disabled = {isTimerOn || seconds >= 60} onClick={handleClickSeconds} />
        <div className={css.buttons}>
            <button disabled = {isTimerOn} className = {css.button} onClick={() => dispatch(increment({field: "seconds"}))}>+</button>
            <button disabled = {isTimerOn} className = {css.button} onClick={() => dispatch(decrement({field: "seconds"}))}>-</button>
        </div>
      </div>
      <div className={css.results}>
        <h3 className={css.header}>Keçmiş ölçmələr:</h3>
        <ul>
          {results.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
