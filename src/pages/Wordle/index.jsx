import {useState, useCallback} from "react";

import Grid from "@components/Wordle";
import Keyboard from "@components/Wordle/Keyboard";
import GameHeader from "@components/common/GameHeader";

import styles from "@components/Wordle/styles.module.css";

const CONFIG = {
	MAX_ATTEMPTS: 6,
	WORD_LENGTH: 5,
	SECRET_WORD: "LIVRO"
};

// ! Essas validações vão vir do back 
export default function Wordle() {
	const [guesses, setGuesses] = useState([]);
	const [currentGuess, setCurrentGuess] = useState("");
	const [isGameOver, setIsGameOver] = useState(false);

	const handleKeyPress = useCallback(
		(key) => {
			if (isGameOver) return;

			const normalizedKey = key.toUpperCase();
			if (normalizedKey === "ENTER") {
				if (currentGuess.length === CONFIG.WORD_LENGTH) {
					const newGuesses = [...guesses, currentGuess];
					setGuesses(newGuesses);
					setCurrentGuess("");

					if (currentGuess === CONFIG.SECRET_WORD) {
						setIsGameOver(true);
					}
				}
			} else if (normalizedKey === "BACKSPACE") {
				setCurrentGuess((prev) => prev.slice(0, -1));
			} else if (currentGuess.length < CONFIG.WORD_LENGTH && /^[A-Z]$/.test(normalizedKey)) {
				setCurrentGuess((prev) => prev + normalizedKey);
			}
		},
		[currentGuess, guesses, isGameOver]
	);

	const getLetterColor = (letter, index, guess) => {
		if (letter === CONFIG.SECRET_WORD[index]) return "green";
		const letterCount = CONFIG.SECRET_WORD.split("").filter((l) => l === letter).length;
		const guessedCount = guess
			.slice(0, index + 1)
			.split("")
			.filter((l) => l === letter).length;
		if (CONFIG.SECRET_WORD.includes(letter) && guessedCount <= letterCount) return "goldenrod";
		return "gray";
	};

	const getKeyColor = (key) => {
		if (key === "ENTER" || key === "BACKSPACE") return "";

		let color = "";

		for (let guess of guesses) {
			for (let i = 0; i < guess.length; i++) {
				if (guess[i] === key) {
					const currentColor = getLetterColor(key, i, guess);

					if (currentColor === "green") return "green";
					if (currentColor === "goldenrod") color = "goldenrod";
					if (currentColor === "gray" && color !== "goldenrod" && color !== "green") color = "absent";
				}
			}
		}

		return color;
	};

	return (
		<div className={styles.wordleContainer}>
			<GameHeader task="Task 3" />
			<Grid guesses={guesses} isGameOver={isGameOver}  currentGuess={currentGuess} getLetterColor={getLetterColor} />
			<Keyboard onKeyPress={handleKeyPress} guesses={guesses} getLetterColor={getKeyColor} />
		</div>
	);
}
