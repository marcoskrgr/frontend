import React from "react";

import Button from "./Button";

import styles from "./styles.module.css";

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

function Grid({ guesses, currentGuess, getLetterColor }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
        const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess : "");
        const letters = guess.padEnd(WORD_LENGTH, " ").split("");
        const isActiveRow = rowIndex === guesses.length;

        return (
          <div
            key={`row-${rowIndex}`}
            className={`${styles.row} ${isActiveRow ? styles.activeRow : ""}`}
          >
            {letters.map((letter, colIndex) => {
              const color =
                rowIndex < guesses.length ? getLetterColor(letter, colIndex, guesses[rowIndex]) : "";
              return (
                <Button
                  key={`cell-${rowIndex}-${colIndex}`}
                  letter={letter}
                  color={color}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;