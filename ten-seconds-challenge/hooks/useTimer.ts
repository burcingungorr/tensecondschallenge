import { useState, useRef } from 'react';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null); 

  const startTimer = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = window.setInterval(() => {
      setTime(prev => prev + 0.01);
    }, 10);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
    setRunning(false);
  };

  return { time, running, startTimer, stopTimer, resetTimer };
};

export default useTimer;
