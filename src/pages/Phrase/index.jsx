import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

import Input from "@components/common/Input";
import Button from "@components/common/Button";
import SoftExtendedLogo from "../../assets/SoftExtendedLogo.png";

import styles from "./style.module.css";
import {GameRepository} from "@repositories/games.js";
import {useToast} from "@components/common/Toast/ToastProvider.jsx";

function Phrase() {
	const navigate = useNavigate();
	const [word, setWord] = useState("");
	const [wasSubmitted, setWasSubmitted] = useState(false);
	const [showError, setShowError] = useState(false);
	const [buttonLabel, setButtonLabel] = useState("enviar");
	const [isCorrect, setIsCorrect] = useState(false);
	const {wordGuess} = GameRepository();
	const { addToast } = useToast();

	function getErrorMessage(error) {
		if (error?.response?.data?.message) {
			return error.response.data.message;
		}

		if (typeof error?.response?.data === 'string') {
			return error.response.data;
		}

		if (error?.message) {
			return error.message;
		}

		return "Ocorreu um erro desconhecido. Por favor, tente novamente.";
	}


	const handleChange = (e) => {
		const value = e.target.value;

		console.log("value", value);
		setWord(value);

		if (showError) {
			setShowError(false);
		}
		if (wasSubmitted) {
			setWasSubmitted(false);
			setButtonLabel("enviar");
		}
	};

	const handleSubmit = async (word) => {

		let guessResult;
		try {
			guessResult = await wordGuess({
				word: word.trim().toUpperCase()
			});
		} catch (error) {
			getErrorMessage(guessResult);
		}

		setWasSubmitted(true);

		if (guessResult.success) {
			setButtonLabel(":)");
			confetti({
				particleCount: 150,
				spread: 100,
				origin: {y: 0.6}
			});
		} else {
			setShowError(true);
			setButtonLabel(":(");
		}
	};

	return (
		<div className={styles["container"]}>
			<img className={styles["logo"]} src={SoftExtendedLogo} alt="Logo da Softexpert" />
			<div className={styles["content"]}>
				<span>Preencha com a frase do momento!</span>
				<Input
					id="word"
					label="Digite aqui..."
					value={word}
					isValid={wasSubmitted ? !showError : null}
					onChange={handleChange}
				/>
				<Button
					isDisabled={word.length < 1}
					type="primary"
					size="small"
					text={buttonLabel}
					customStyle={
						wasSubmitted
							? isCorrect
								? {backgroundImage: "linear-gradient(to top, #00E883 0%, #009182 100%)"}
								: {backgroundImage: "linear-gradient(to top, #FF7D7E 0%, #B40048 100%)"}
							: {}
					}
					onClick={() => handleSubmit(word)}
				/>
			</div>
			<Button
				type="primary"
				size="small"
				text="Voltar para a home"
				onClick={() => navigate("/")}
			/>
		</div>
	);
}

export default Phrase;
