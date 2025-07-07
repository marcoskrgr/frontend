import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

import Input from "@components/common/Input";
import Button from "@components/common/Button";
import SoftExtendedLogo from "../../assets/SoftExtendedLogo.png";
import { GameRepository } from "@repositories/games.js";

import styles from "./style.module.css";

function Word() {
	const navigate = useNavigate();
	const { wordGuess } = GameRepository();

	const [word, setWord] = useState("");
	const [wasSubmitted, setWasSubmitted] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [buttonLabel, setButtonLabel] = useState("enviar");
	const [message, setMessage] = useState(null);

	const resetFeedback = () => {
		setMessage(null);
		setWasSubmitted(false);
		setButtonLabel("enviar");
	};

	const handleChange = (e) => {
		setWord(e.target.value);
		resetFeedback();
	};

	const showErrorToast = (errorMessage) => {
		setMessage(errorMessage);
		setIsCorrect(false);
		setButtonLabel(":(");
	};

	const handleSubmit = async () => {
		setWasSubmitted(true);
		try {
			const result = await wordGuess({ word: word.trim().toUpperCase() });

			if (result.success) {
				setIsCorrect(true);
				setMessage(result.message);
				setButtonLabel(":)");
				confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
			} else {
				showErrorToast(result.message);
			}
		} catch (error) {
			const msg = error?.response?.data?.message || "Erro ao enviar a palavra.";
			showErrorToast(msg);
		}
	};

	const getButtonStyle = () => {
		if (!wasSubmitted) return {};
		return isCorrect
			? { backgroundImage: "linear-gradient(to top, #00E883 0%, #009182 100%)" }
			: { backgroundImage: "linear-gradient(to top, #FF7D7E 0%, #B40048 100%)" };
	};

	return (
		<div className={styles.container}>
			<img className={styles.logo} src={SoftExtendedLogo} alt="Logo da Softexpert" />
			<div className={styles.content}>
				<Input
					id="word"
					label="Qual a palavra do momento?"
					value={word}
					placeholder="Digite a palavra"
					isValid={wasSubmitted ? isCorrect : null}
					onChange={handleChange}
				/>
				<Button
					isDisabled={word.trim() === ""}
					type="primary"
					size="small"
					text={buttonLabel}
					customStyle={getButtonStyle()}
					onClick={handleSubmit}
				/>
				{message && <span className={styles.message}>{message}</span>}
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

export default Word;
