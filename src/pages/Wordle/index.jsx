import {useState, useCallback, useEffect} from "react";

import Grid from "@components/Wordle";
import Keyboard from "@components/Wordle/Keyboard";
import GameHeader from "@components/common/GameHeader";

import {LetterStatusEnum} from "../../constants/wordleConstants";
import {GameRepository} from "../../repositories/games";
import FinishModal from "@components/common/FinishModal";

const CONFIG = {
	MAX_ATTEMPTS: 6,
	WORD_LENGTH: 5,
	SECRET_WORD: "LIVRO"
};

const getDefaultGuess = () => {
	return new Array(CONFIG.WORD_LENGTH).fill({char: ""});
};

const filledCharacterCount = (guess) => {
	return guess.reduce((count, item) => {
		return item.char === "" ? count - 1 : count;
	}, CONFIG.WORD_LENGTH);
};

const addGuessCharacter = (guess, char) => {
	const idx = guess.findIndex((item) => item.char === "");

	if (idx === -1) return guess;

	return guess.map((item, i) => (i === idx ? {...item, char} : item));
};

const removeGuessCharacter = (guess) => {
	return guess.map((item, i) => (i === filledCharacterCount(guess) - 1 ? {...item, char: ""} : item));
};

export default function Wordle() {
	const [guesses, setGuesses] = useState([]);
	const [currentGuess, setCurrentGuess] = useState(getDefaultGuess());
	const [isGameOver, setIsGameOver] = useState(false);
	const [timer, setTimer] = useState(0);

	const {getTermData, termGuess} = GameRepository();

	useEffect(() => {
		if (isGameOver) return;

		const interval = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [isGameOver]);

	useEffect(() => {
		const fetchData = async () => {
			const {tries} = await getTermData();
			setGuesses(tries);
		};
		fetchData();
	}, []);

	const handleKeyPress = useCallback(
		async (key) => {
			if (isGameOver) return;

			const normalizedKey = key.toUpperCase();

			if (normalizedKey === "ENTER") {
				if (filledCharacterCount(currentGuess) === CONFIG.WORD_LENGTH) {
					const fullWord = currentGuess.reduce((word, item) => word + item.char, "");

					const guessResult = await termGuess({guess: fullWord});

					const newGuesses = [...guesses, guessResult];
					setGuesses(newGuesses);
					setCurrentGuess(getDefaultGuess());

					const playerWon = guessResult.every((letter) => letter.status === LetterStatusEnum.CORRECT);
					const maxAttemptsReached = newGuesses.length >= CONFIG.MAX_ATTEMPTS;

					if (playerWon || maxAttemptsReached) {
						setIsGameOver(true);
					}
				}
			} else if (normalizedKey === "BACKSPACE") {
				setCurrentGuess((prev) => removeGuessCharacter(prev));
			} else if (filledCharacterCount(currentGuess) < CONFIG.WORD_LENGTH && /^[A-Z]$/.test(normalizedKey)) {
				setCurrentGuess((prev) => addGuessCharacter(prev, normalizedKey));
			}
		},
		[currentGuess, guesses, isGameOver]
	);

	const getColor = (status) => {
		if (status === LetterStatusEnum.CORRECT) return "green";
		if (status === LetterStatusEnum.INCORRECT_POSITION) return "goldenrod";
		if (status === LetterStatusEnum.DONT_EXIST) return "gray";
		return "absent";
	};

	return (
		<div style={{padding: "24px"}}>
			<GameHeader task="Task #3" timer={timer} />
			<Grid guesses={guesses} isGameOver={isGameOver} currentGuess={currentGuess} getLetterColor={getColor} />
			<Keyboard onKeyPress={handleKeyPress} guesses={guesses} getLetterColor={getColor} />
			<FinishModal time={timer} showModal={isGameOver} />
		</div>
	);
}
