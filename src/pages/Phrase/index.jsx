import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

import Input from "@components/common/Input";
import Button from "@components/common/Button";
import SoftExtendedLogo from "../../assets/SoftExtendedLogo.png";

import styles from "./style.module.css";

function Phrase() {
	const navigate = useNavigate();
	const [phrase, setPhrase] = useState("");
	const [wasSubmitted, setWasSubmitted] = useState(false);
	const [showError, setShowError] = useState(false);
	const [buttonLabel, setButtonLabel] = useState("enviar");

	const correctPhrase = "we are experts and global";
	const isCorrect = phrase.trim() === correctPhrase;

	const handleChange = (e) => {
		const value = e.target.value;
		setPhrase(value);

		if (showError) {
			setShowError(false);
		}
		if (wasSubmitted) {
			setWasSubmitted(false);
			setButtonLabel("enviar");
		}
	};

	const handleSubmit = () => {
		setWasSubmitted(true);

		if (isCorrect) {
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
					id="phrase"
					label="Digite aqui..."
					value={phrase}
					isValid={wasSubmitted ? !showError : null}
					onChange={handleChange}
				/>
				<Button
					isDisabled={phrase.length < 1}
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
					onClick={handleSubmit}
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
