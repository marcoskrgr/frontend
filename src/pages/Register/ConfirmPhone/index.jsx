import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

import Button from "@components/common/Button";

import styles from "../../Register/style.module.css";

function ConfirmPhone() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
    canSubmit: false,
    inputs: [
      { id: "code", label: "Preencha com o código enviado ao seu Telefone!", inputMode: "numeric", isRequired: true, alignCenter: true, type: "number", error: "", value: "" }
    ]
  });
	const isValid = inputs.canSubmit;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputs);

		navigate("/");
	};

	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src="../../../src/assets/SoftExtendedLogo.png" alt="Logo da SoftExpert" />

			<form className={styles["form"]} onSubmit={handleSubmit}>
{/* 				<TextInputList data={inputs} setData={setInputs} />
 */}
				<div className={styles["formFooter"]}>
					<Button
						isDisabled={!isValid}
						type="primary"
						size="small"
						text={"Continuar"}
						onClick={handleSubmit}
						customStyle={{width: "100%"}}
					/>

					<Link className={styles["a"]} to={"/"}>
						já possui login?
					</Link>
				</div>
			</form>
		</div>
	);
}

export default ConfirmPhone;
