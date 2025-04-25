import React from "react";
import PropTypes from "prop-types";
import {validateEmail, validatePhone, validatePassword, formatPhone} from "./validTypes";
import Input from "./Input";
import styles from "./style.module.css";

function TextInputList({data, setData}) {
	function handleInputChange(id, value) {
		setData((prevInputs) => {
      const getInput = (id) => updated.find((inp) => inp.id === id);
			const updated = prevInputs.inputs.map((inp) => (inp.id === id ? {...inp, value} : {...inp}));
			const password = getInput("password");
			const confPass = getInput("confPass");
			const email = getInput("email");
			const phone = getInput("phone");

			let canSubmit = true;

			switch (id) {
				case "password":
					password.error = !validatePassword(password.value) ? "A senha deve ter pelo menos 10 dígitos, letras e números!" : "";
					confPass.error = confPass.value && password.value != confPass.value ? "Senhas não coincidem" : "";
					break;
				case "confPass":
					confPass.error = confPass.value !== password.value ? "Senhas não coincidem" : "";
					break;
				case "email":
					email.error = !validateEmail(value) ? "E-mail inválido" : "";
					break;
				case "phone":
					value = formatPhone(value);
					phone.error = !validatePhone(value) ? "Telefone inválido" : "";
					break;
				default:
					break;
			}

			canSubmit = !updated.some((inp) => !inp.value || inp.error);

			return {...prevInputs, inputs: updated, canSubmit: canSubmit};
		});
	}

	return (
		<div className={styles["inputList"]}>
			{data.inputs.map((inp) => (
				<Input
					key={inp.id}
					id={inp.id}
					type={inp.type}
					inputMode={inp.inputMode}
					label={inp.label}
					isRequired={inp.isRequired}
					alignCenter={inp.alignCenter}
					value={inp.value}
					error={inp.error}
					onChange={handleInputChange}
				/>
			))}
		</div>
	);
}

TextInputList.propTypes = {
	data: PropTypes.object.isRequired,
	setData: PropTypes.func.isRequired
};

export default TextInputList;
