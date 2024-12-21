import React, { useEffect, useState } from 'react'
import css from "./Hour.module.css";

export default function Hour() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000)
    return () => clearInterval(timer);
  }, [])

  let current_hours = time.getHours();
  let current_minutes = time.getMinutes();
  let current_seconds = time.getSeconds();
  const result = `${current_hours}:${current_minutes}:${current_seconds}`
  return (
    <div className = {css.container}>
      <div className = {css.time}>{result} </div>
    </div>
  )
}
