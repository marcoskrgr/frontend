import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import styles from "../style.module.css";
import {formatPhone, validateEmail, validatePassword, validatePhone} from "@components/common/Input/validTypes";
import { createAuthController } from "@controllers/auth";

const initialInputs = [
	{id: "firstName", label: "Nome", isRequired: true, type: "text", value: ""},
	{id: "lastName", label: "Sobrenome", isRequired: true, type: "text", value: ""},
	{id: "email", label: "E-mail", isRequired: true, type: "email", value: ""},
	{id: "password", label: "Senha", isRequired: true, type: "password", value: ""},
	{id: "confPass", label: "Confirmar Senha", isRequired: true, type: "password", value: ""}
];

function Register() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState(initialInputs);

	const authController = createAuthController();

	const handleInputChange = (id, value) => {
		const updatedInputs = inputs.map((input) => {
			if (input.id === id) {
				let error = "";

				if (value.length > 5) {
					if (id === "email" && !validateEmail(value)) {
						error = "E-mail inválido";
					} else if (id === "phone") {
						const formattedPhone = formatPhone(value);
						if (!validatePhone(formattedPhone)) {
							error = "Telefone inválido";
						}
					} else if (id === "password" && !validatePassword(value)) {
						error = "A senha deve ter pelo menos 10 dígitos, letras e números!";
					} else if (id === "confPass" && value !== inputs.find((i) => i.id === "password").value) {
						error = "Senhas não coincidem";
					}
				}

				return {...input, value, error};
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

		try {
			await authController.register(userData);
			navigate("/confirm-phone");
		} catch (error) {
			console.error("Erro ao registrar usuário:", error.response?.data || error.message);
			alert("Erro ao registrar usuário: " + (error.response?.data?.message || error.message));
		}
	};
	return (
		<div className={styles.content}>
			<img className={styles.logoSoft} src="../../../src/assets/SoftExtendedLogo.png" alt="Logo da SoftExpert" />
			<form className={styles.form} onSubmit={handleSubmit}>
				{inputs.map(({id, label, type, value, error, isRequired}) => (
					<Input
						key={id}
						id={id}
						type={type}
						label={label}
						isRequired={isRequired}
						value={value}
						error={error}
						onChange={handleInputChange}
					/>
				))}
				<div className={styles.formFooter}>
					<Button
						isDisabled={!canSubmit}
						type="primary"
						size="small"
						text="Continuar"
						onClick={handleSubmit}
						customStyle={{width: "100%"}}
					/>
					<Link className={styles.a} to="/">
						já possui login?
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Register;
