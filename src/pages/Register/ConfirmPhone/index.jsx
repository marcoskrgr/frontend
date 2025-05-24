import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import confetti from "canvas-confetti";

import Input from "@components/common/Input";
import Button from "@components/common/Button";
import {formatPhone, unformatPhone, validatePhone} from "@components/common/Input/validTypes";
import styles from "../style.module.css";
import {createAuthController} from "@controllers/auth";

function ConfirmPhone() {
	const navigate = useNavigate();

	const {insertPhone, confirmPhone} = createAuthController();

	const [step, setStep] = useState("phone");
	const [phone, setPhone] = useState("");
	const [code, setCode] = useState("");
	const [wasSubmitted, setWasSubmitted] = useState(false);
	const [showError, setShowError] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [buttonLabel, setButtonLabel] = useState("confirmar");

	const handlePhoneChange = (e) => {
		const value = e.target.value;
		const formattedPhone = formatPhone(value);
		setPhone(formattedPhone);
	};

	const handlePhoneSubmit = () => {
		if (validatePhone(phone)) {
			const cleanPhone = unformatPhone(phone);
			const response = insertPhone({phone: cleanPhone});
			if (response) {
				setStep("code");
			}
		}
	};

	const handleCodeChange = (e) => {
		const value = e.target.value;
		setCode(value);
	};

	const handleCodeSubmit = () => {
		setWasSubmitted(true);

		const response = confirmPhone({code: code});

		if (response) {
			setIsCorrect(true);
			setButtonLabel(":)");
			confetti({
				particleCount: 120,
				spread: 70,
				origin: {y: 0.6}
			});
		} else {
			setButtonLabel(":(");
		}
	};

	return (
		<div className={styles["container"]}>
			<img className={styles["logo"]} src="../../../src/assets/SoftExtendedLogo.png" alt="Logo da Softexpert" />
			<div className={styles["content"]}>
				{step === "phone" && (
					<>
						<Input label="Telefone" value={phone} type="tel" onChange={handlePhoneChange} placeholder="(99) 99999-9999" />
						<Button
							isDisabled={!validatePhone(phone)}
							type="primary"
							size="small"
							customStyle={{width: "100%"}}
							text="Enviar código"
							onClick={handlePhoneSubmit}
						/>
					</>
				)}

				{step === "code" && (
					<>
						<Input
							label="Código de verificação"
							value={code}
							type="number"
							inputMode="numeric"
							isValid={wasSubmitted ? !showError : null}
							onChange={handleCodeChange}
						/>
						<Button
							isDisabled={code.length < 4 || isCorrect}
							type="primary"
							size="small"
							text={buttonLabel}
							customStyle={
								wasSubmitted
									? isCorrect
										? {backgroundImage: "linear-gradient(to top, #00E883 0%, #009182 100%)", width: "100%"}
										: {backgroundImage: "linear-gradient(to top, #FF7D7E 0%, #B40048 100%)", width: "100%"}
									: {width: "100%"}
							}
							onClick={handleCodeSubmit}
						/>
					</>
				)}
			</div>
			<div>{isCorrect && <Button type="primary" size="small" text="Partiu jogar" onClick={() => navigate("/map")} />}</div>
		</div>
	);
}

export default ConfirmPhone;
