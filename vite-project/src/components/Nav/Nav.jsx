import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import css from "./Nav.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { addResult, setLastValue, startTimer, stopTimer, stopwatch, timer } from '../../features/timerSlice';

export default function Nav() {

  const dispatch = useDispatch();
  const hours = useSelector((state) => state.timer.hours);
  const minutes = useSelector((state) => state.timer.minutes);
  const seconds = useSelector((state) => state.timer.seconds);
  const isTimerOn = useSelector((state) => state.timer.isTimerOn);
  const results = useSelector((state) => state.timer.results);
  const location = useLocation();

  const time = `${hours}:${minutes}:${seconds}`;

  const startStopButtonForStopwatch = () => {
    if(isTimerOn) {
      dispatch(stopTimer());
    }
    else if(!isTimerOn) {
      dispatch(startTimer());
      const timer = setInterval(() => {
        dispatch(stopwatch())
      }, 1000);
      dispatch(setLastValue(timer));
    }
  }

  const cycleButton = () => {
    if(isTimerOn) {
      dispatch(addResult(time));
      results.map((item, index) => `${index + 1}. ${item}`).join("\n");
    }
  }

  const startStopButtonForTimer = () => {
    if (isTimerOn) {
      dispatch(stopTimer());
    } else {
      const time = setInterval(() => {
        dispatch(timer());
      }, 1000);
      dispatch(startTimer(time));
    }
  };

  const handleButtonClick = () => {
    if(location.pathname === "/stopwatch") {
      startStopButtonForStopwatch();
    }
    else if(location.pathname === "/taymer") {
      startStopButtonForTimer();
    }
  }

  return (
    <div className = {css.navbar}>
        <NavLink className={({ isActive }) => 
          isActive ? `${css.navElement} ${css.activeNavElement}` : css.navElement
        } to = "/">Saat</NavLink>
        <NavLink className={({ isActive }) => 
          isActive ? `${css.navElement} ${css.activeNavElement}` : css.navElement
        } to = "/stopwatch">Saniyəölçən</NavLink>
        <NavLink className={({ isActive }) => 
          isActive ? `${css.navElement} ${css.activeNavElement}` : css.navElement
        } to = "/taymer">Taymer</NavLink>
        <button onClick={handleButtonClick} className={css.button}>{ isTimerOn? "⏸️" : "▶️"}</button>
        {location.pathname === "/stopwatch" && (
          <button onClick={cycleButton} className={css.button}>⭘</button>
        )}
    </div>
  )
}