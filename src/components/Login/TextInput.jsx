import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfPassword,
} from "./validTypes";

function TextInput({ id, label, isRequired, onChange, type, validType }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  /* Preciso fazer com que ao mudar o campo senha, o campo confirmar senha seja validado TAMBEM 
   * Por que senao depois de deixas as 2 senhas iguais, vc pode mudar a senha novamente, e o sistema
   * acha que é valido ainda,
   * EX:
   * senha: 123
   * confSenha: 123
   * valido
   * 
   * senha: 1234
   * confSenha: 123
   * continua valido, pois so foi feita a checagem da senha
   * 
   * Vou ter que reescrever essa forma de validacao pra algo mais robusto,
   * possivelmente em uma funcao pai, que chama essas funções filho so que busca pelos id's pra poder mandar
   * a mensagem de erro caso a caso, ai o switch ficaria dentro dela eu acho..
   * ai eu teria que desacoplar a verificacao de estilo e a mudanca label pra serem alteradas nessa funcao, e nao quando
   * o componente e atualizado. Acho que vai dar bom.
  */
  const handleChange = (event) => {
    const newValue = event.target.value;
    let validate;
    setValue(newValue);

    switch (validType) {
      case "email":
        validate = validateEmail;
        break;
      case "phone":
        validate = validatePhone;
        break;
      case "password":
        validate = validatePassword;
        break;
      case "confpassword":
        validate = validateConfPassword;
        break;
      default:
        validate = "";
    }

    if (typeof validate === "function") {
      const validation = validate(newValue);
      if (!validation.isValid) {
        setErrorMsg(validation.message);
        setError(true);
      } else {
        setErrorMsg("");
        setError(false);
      }
    } else {
      setErrorMsg("");
      setError(false);
    }

    onChange(newValue);
  };

  return (
    <div className={styles["inputWrapper"]}>
      <label className={styles["label"]}>
        {error && errorMsg ? errorMsg : label}
      </label>
      <div
        className={styles["gradient"] + (error && errorMsg ? " " + styles["error"] : " ")}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          required={isRequired}
          className={styles["input"]}
          data-isvalid={error ? "false" : "true"}
        />
      </div>
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  validType: PropTypes.string,
};

export default TextInput;
