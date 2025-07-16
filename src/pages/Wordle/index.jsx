import {useState, useCallback, useEffect} from "react";

import Grid from "@components/Wordle";
import Keyboard from "@components/Wordle/Keyboard";
import GameHeader from "@components/common/GameHeader";

import {LetterStatusEnum} from "../../constants/wordleConstants";
import {GameRepository} from "../../repositories/games";
import FinishModal from "@components/common/FinishModal";
import Help from "@components/Wordle/Help";
import {useAuthStore} from "@stores/useAuth";

const CONFIG = {
	MAX_ATTEMPTS: 6,
	WORD_LENGTH: 5,
	SECRET_WORD: "LIVRO"
};

const getDefaultGuess = () => new Array(CONFIG.WORD_LENGTH).fill({char: ""});

const filledCharacterCount = (guess) => guess.reduce((count, item) => (item.char === "" ? count - 1 : count), CONFIG.WORD_LENGTH);

const addGuessCharacter = (guess, char) => {
	const idx = guess.findIndex((item) => item.char === "");
	if (idx === -1) return guess;
	return guess.map((item, i) => (i === idx ? {...item, char} : item));
};

const removeGuessCharacter = (guess) => guess.map((item, i) => (i === filledCharacterCount(guess) - 1 ? {...item, char: ""} : item));

export default function Wordle() {
	const [guesses, setGuesses] = useState([]);
	const [currentGuess, setCurrentGuess] = useState(getDefaultGuess());
	const [isGameOver, setIsGameOver] = useState(false);
	const [isHelpOpen, setIsHelpOpen] = useState(false);
	const markLastTaskAsPlayed = useAuthStore((state) => state.markLastTaskAsPlayed);

	const {getTermData, termGuess} = GameRepository();

	useEffect(() => {
		if (isGameOver) {
			markLastTaskAsPlayed();
		}
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
			<GameHeader task="Task #3" isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} ContentHelp={Help} />
			<Grid guesses={guesses} isGameOver={isGameOver} currentGuess={currentGuess} getLetterColor={getColor} />
			<Keyboard onKeyPress={handleKeyPress} guesses={guesses} getLetterColor={getColor} />
			<FinishModal showModal={isGameOver} />
		</div>
	);
}
