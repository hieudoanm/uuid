import { Glass } from '@micro/components/shared/Glass';
import { Navbar } from '@micro/components/shared/Navbar';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const WORK_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

const PomodoroPage: NextPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(interval!);
            setIsRunning(false);
            setIsBreak((b) => !b);
            return isBreak ? WORK_DURATION : BREAK_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isBreak]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(WORK_DURATION);
  };

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="w-full border-t border-neutral-800" />
      <div className="grow">
        <div className="flex h-full flex-col items-center justify-center bg-neutral-900 px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold">Pomodoro Timer</h1>
          <p className="mb-2 text-lg text-neutral-400">
            {isBreak ? 'Break Time' : 'Focus Time'}
          </p>
          <div className="mb-6 font-mono text-6xl tabular-nums">
            {formatTime(timeLeft)}
          </div>
          <div className="flex gap-4">
            <Glass.Button onClick={() => setIsRunning((r) => !r)}>
              {isRunning ? 'Pause' : 'Start'}
            </Glass.Button>
            <Glass.Button onClick={handleReset}>Reset</Glass.Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroPage;
