import React from "react";
import styles from "./Grid/styles.module.css";

const QWERTY = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

function Keyboard({ onKeyPress, guesses, getLetterColor }) {
  const getKeyColor = (key) => {
    if (key === "ENTER" || key === "BACKSPACE") return "";
    for (let guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === key) {
          return getLetterColor(key, i, guess);
        }
      }
    }
    return "";
  };

  return (
    <div className={styles.keyboard}>
      {QWERTY.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className={styles.row}>
          {row.map((key) => (
            <button
              key={key}
              className={`${styles.key} ${styles[getKeyColor(key)]} ${key === "ENTER" && styles.enter}`}
              onClick={() => onKeyPress(key)}
            >
              {key === "BACKSPACE" ? "<-" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;