import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

function HeaderMemory({ taskName = "Task 4", initialTime = 180, score = 0, gameStarted = false }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const progress = (initialTime - timeLeft) / initialTime * 100;

  return (
    <div className={styles.header}>
      <div className={styles.circle}>
        <svg className={styles.svg} viewBox="0 0 36 36">
          <path
            className={styles.background}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={styles.progress}
            strokeDasharray={`${progress}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className={styles.percentage}>
            {score}
          </text>
        </svg>
      </div>

      <div className={styles.title}>{taskName}</div>

      <div className={styles.time}>{formatTime(timeLeft)}</div>
    </div>
  );
}

export default HeaderMemory;
