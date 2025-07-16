import React from "react";

import Button from "./Button";

import styles from "./styles.module.css";

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

function Grid({guesses, currentGuess, getLetterColor, isGameOver}) {
	return (
		<div className={styles.grid}>
			<span className={styles["label"]}>Descubra a palavra do mundo tech</span>
			{Array.from({length: MAX_ATTEMPTS}).map((_, rowIndex) => {
				const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess : new Array(WORD_LENGTH).fill({char: ""}));
				const isActiveRow = !isGameOver && rowIndex === guesses.length;

				return (
					<div key={`row-${rowIndex}`} className={`${styles.row} ${isActiveRow ? styles.activeRow : ""}`}>
						{guess.map(({char, status}, colIndex) => {
							const color = rowIndex < guesses.length ? getLetterColor(status) : "";
							return <Button key={`${rowIndex}-${colIndex}`} letter={char} color={color} />;
						})}
					</div>
				);
			})}
		</div>
	);
}

export default Grid;
