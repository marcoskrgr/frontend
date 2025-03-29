import React, { useState } from "react";
import styles from "./style.module.css";
import TextInput from "../../components/Login/TextInput";
import Button from "../../components/common/Button";

function Register() {
  const [valid, setValid] = useState(false);

  const handleChange = (event) => {
    let inputList = document.getElementsByTagName("input");

    /* por algum motivo sempre fica 1 validação atrás, tipo eu termino de preencher e fica invalido
     * ai atualizo mais um vez e fica valido
     * Pedir ajuda pra geos
     */
    Array.from(inputList).forEach((input) => {
      if (input.dataset.isvalid === "false" || input.value === "") {
        setValid(false);
      } else {
        setValid(true);
      }
    })
  };

  return (
    <div className={styles["content"]}>
      <img
        className={styles["logo-soft"]}
        src="../../../src/assets/SoftExtendedLogo.png"
        alt="Logo da SoftExpert"
      />

      <form className={styles["form"]}>
        <TextInput
          id={"name"}
          label="Nome"
          isRequired={true}
          type={"text"}
          onChange={handleChange}
        />

        <TextInput
          id={"surname"}
          label="Sobrenome"
          isRequired={true}
          type={"text"}
          onChange={handleChange}
        />

        <TextInput
          id={"email"}
          label="E-mail"
          isRequired={true}
          type={"text"}
          onChange={handleChange}
          validType={"email"}
        />

        <TextInput
          id={"phone"}
          label="Telefone"
          isRequired={true}
          type={"tel"}
          onChange={handleChange}
          validType={"phone"}
        />

        <TextInput
          id={"password"}
          label="Senha"
          isRequired={true}
          type={"password"}
          onChange={handleChange}
          validType={"password"}
        />

        <TextInput
          id={"confpassword"}
          label="Confirmar Senha"
          isRequired={true}
          type={"password"}
          onChange={handleChange}
          validType={"confpassword"}
        />

        <button
          className={(valid ? " " : styles["disabled"]) + " " + styles["button"]}
          disabled={valid ? false : true}
          type="submit"
        >
          Continuar
        </button>
      </form>

      <a className={styles["a"]} href="#">
        já possui login?
      </a>
    </div>
  );
}

export default Register;
