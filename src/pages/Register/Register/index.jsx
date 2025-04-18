import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextInputList from "../../../components/common/Input/TextInputList";
import registerInputs from "./registerInputs";
import styles from "../../Register/style.module.css";

function Register() {
	const [inputs, setInputs] = useState(registerInputs);
	const isValid = inputs.canSubmit;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputs);
	};

	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src="../../../src/assets/SoftExtendedLogo.png" alt="Logo da SoftExpert" />

			<form className={styles["form"]} onSubmit={handleSubmit}>
				<TextInputList data={inputs} setData={setInputs} />

				<div className={styles["formFooter"]}>
					<Link to={"/confirm-phone"} style={{width: "100%"}}>
						<button
							className={(isValid ? " " : styles["disabled"]) + " " + styles["button"]}
							disabled={isValid ? false : true}
							type="submit">
							Continuar
						</button>
					</Link>

					<a className={styles["a"]} href="#">
						já possui login?
					</a>
				</div>
			</form>
		</div>
	);
}

export default Register;
