import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

import Input from "@components/common/Input";
import Button from "@components/common/Button";
import {createAuthController} from "@controllers/auth";
import {formatPhone, validateEmail, validatePassword, validatePhone} from "@components/common/Input/validTypes";
import SoftExtendedLogo from "../../../assets/SoftExtendedLogo.png";

import styles from "../style.module.css";

const initialInputs = [
	{id: "firstName", label: "Nome", isRequired: true, type: "text", value: ""},
	{id: "lastName", label: "Sobrenome", isRequired: true, type: "text", value: ""},
	{id: "email", label: "E-mail", isRequired: true, type: "email", value: ""},
	{id: "phone", placeholder: "(99) 99999-9999", label: "Telefone", isRequired: true, type: "phone", value: ""},
	{id: "password", label: "Senha", isRequired: true, type: "password", value: ""},
	{id: "confPass", label: "Confirmar Senha", isRequired: true, type: "password", value: ""}
];

function Register() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState(initialInputs);
	const [confirmTerm, setConfirmTerm] = useState(false);
	const [isTermModalOpen, setIsTermModalOpen] = useState(false);

	const {register} = createAuthController();

	const handleInputChange = (e) => {
		const {id, value} = e.target;

		const updatedInputs = inputs.map((input) => {
			if (input.id === id) {
				let inputValue = value;
				let error = "";

				if (id === "phone") {
					inputValue = formatPhone(value);
					if (inputValue.length > 0 && !validatePhone(inputValue)) {
						error = "Telefone inválido";
					}
				} else if (id === "email" && value.length > 0 && !validateEmail(value)) {
					error = "E-mail inválido";
				} else if (id === "password" && value.length > 0 && !validatePassword(value)) {
					error = "A senha deve ter pelo menos 8 dígitos, letras, números e um caracter especial!";
				} else if (id === "confPass" && value !== inputs.find((i) => i.id === "password").value) {
					error = "Senhas não coincidem";
				}

				return {...input, value: inputValue, error};
			}
			return input;
		});

		const password = updatedInputs.find((i) => i.id === "password");
		const confPass = updatedInputs.find((i) => i.id === "confPass");
		if (confPass && password && confPass.value !== password.value) {
			confPass.error = "Senhas não coincidem";
		} else if (confPass) {
			confPass.error = "";
		}

		setInputs(updatedInputs);
	};

	const canSubmit = inputs.every((i) => i.value && !i.error);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userData = {};
		inputs.forEach(({id, value}) => {
			if (id !== "confPass") {
				userData[id] = value;
			}
		});

		const response = await register(userData);

		if (response) {
			navigate("/confirm-email");
		}
	};

	return (
		<div className={styles["container"]}>
			<img className={styles.logo} src={SoftExtendedLogo} alt="Logo da SoftExpert" />
			<div className={styles.form}>
				<div className={styles["fields"]}>
					{inputs.map(({id, label, placeholder, type, value, error, isRequired}) => (
						<Input
							key={id}
							id={id}
							type={type}
							label={label}
							isRequired={isRequired}
							value={value}
							error={error}
							placeholder={placeholder}
							onChange={handleInputChange}
						/>
					))}
				</div>
				<checkbox className={styles.checkbox}>
					<input type="checkbox" id="confirmTerm" onChange={(e) => setConfirmTerm(e.target.checked)} />
					<label htmlFor="confirmTerm">Concordo com os Termos e Condições de Uso e Política de Privacidade. </label>
				</checkbox>
				<a className={styles["term"]} href="/TermoSoftChallenge.pdf" target="_blank" rel="noopener noreferrer">
					Ler Termos e Condições de Uso e Política de Privacidade
				</a>
				<div className={styles.formFooter}>
					<Button
						isDisabled={!canSubmit || !confirmTerm}
						type="primary"
						size="small"
						text="Continuar"
						onClick={handleSubmit}
						customStyle={{width: "100%"}}
					/>
					<Link className={styles.a} to="/login">
						já possui login?
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
