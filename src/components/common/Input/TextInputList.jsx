import React from "react";
import PropTypes from "prop-types";
import { validateEmail, validatePhone, validatePassword, formatPhone } from "./validTypes";
import Input from "./Input";
import styles from "./style.module.css";

function TextInputList({ data, setData }) {

  function handleInputChange(id, value) {
    setData((prevInputs) => {
      const updated = prevInputs.inputs.map((inp) =>
        inp.id === id ? { ...inp, value } : { ...inp }
      );

      const password = updated.find((inp) => inp.id === "password");
      const confPass = updated.find((inp) => inp.id === "confPass");
      const phone = updated.find((inp) => inp.id === "phone");
      let canSubmit = true

      updated.forEach((inp) => {
        inp.error = "";
      });

      switch (id) {
        case "password":
          if (!validatePassword(password.value)) {
            password.error = "A senha deve ter pelo menos 10 dígitos, letras e números!";
          }

          if (confPass.value && password.value !== confPass.value) {
            confPass.error = "Senhas não coincidem";
          }
          break;
        case "confPass":
          if (confPass.value !== password.value) {
            confPass.error = "Senhas não coincidem";
          }
          break;
        case "email":
          if (!validateEmail(value)) {
            updated.find((inp) => inp.id === "email").error = "E-mail inválido";
          }
          break;
        case "phone":
          value = formatPhone(value)

          if (!validatePhone(value)) {
            phone.error = "Telefone inválido";
          }
          break;
        default:
          break;
      }

      canSubmit = !updated.some(inp => !inp.value || inp.error);

      return { ...prevInputs, inputs: updated, canSubmit: canSubmit};
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
