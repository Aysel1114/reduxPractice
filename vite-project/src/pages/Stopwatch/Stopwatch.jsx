import React, { useState } from 'react';
import css from "./Stopwatch.module.css";
import { useDispatch, useSelector } from 'react-redux';

export default function Stopwatch() {

  const dispatch = useDispatch();
  const hours = useSelector((state) => state.timer.hours);
  const minutes = useSelector((state) => state.timer.minutes);
  const seconds = useSelector((state) => state.timer.seconds);
  const results = useSelector((state) => state.timer.results);
  
  const time = `${hours}:${minutes}:${seconds}`;

  return (
    <div className = {css.container}>
      <p className = {css.time}>{time} </p>
      <div className={css.results}>
        <h3 className={css.header}>Dövrlər:</h3>
        <ul className = {css.list}>
          {results.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}