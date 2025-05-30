import React from "react";
import classNames from "classnames";

import styles from "./styles.module.css";

const QWERTY = [
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
	["A", "S", "D", "F", "G", "H", "J", "K", "L"],
	["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];

function Keyboard({onKeyPress, guesses, getLetterColor}) {
	const getKeyColor = key => {

		guesses = guesses.flat()

		if (key === "ENTER" || key === "BACKSPACE") return "";
		for (let guess of guesses) {
			if (guess.char.toUpperCase() === key) {
				return getLetterColor(guess.status);
			}
		}
		return "";
	};

  const getKeyClasses = (key) => {
    const keyColor = getKeyColor(key);
    return classNames(
      styles.key,
      keyColor && styles[keyColor],
      {
        [styles.enter]: key === "ENTER"
      }
    );
  };
  

	return (
		<div className={styles.keyboard}>
			{QWERTY.map((row, rowIndex) => (
				<div key={`row-${rowIndex}`} className={styles.row}>
					{row.map((key) => (
						<button
							key={key}
							className={getKeyClasses(key)}
							onClick={() => onKeyPress(key)}>
							{key === "BACKSPACE" ? "<-" : key}
						</button>
					))}
				</div>
			))}
		</div>
	);
}

export default Keyboard;
