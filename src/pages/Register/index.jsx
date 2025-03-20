import React from "react";
import styles from "./style.module.css";
import TextInput from "../../components/Login/TextInput";

function Register() {
  return (
    <div className={styles["content"]}>
      <img
        className={styles["logo-soft"]}
        src="../../../src/assets/SoftExtendedLogo.png"
        alt="Logo da SoftExpert"
      />

      <form>

        <TextInput
          id={"name"}
          label="Nome"
          isRequired={true}
          type={"text"}
          onChange={() => {}}
        />

        <TextInput
          id={"email"}
          label="Sobrenome"
          isRequired={true}
          type={"text"}
          onChange={() => {}}
        />

        <TextInput
          id={"email"}
          label="E-mail"
          isRequired={true}
          type={"text"}
          onChange={() => {}}
          validType={"email"}
        />

        <TextInput
          id={"phone"}
          label="Telefone"
          isRequired={true}
          type={"number"}
          onChange={() => {}}
          validType={"phone"}
        />

        <TextInput
          id={"password"}
          label="Senha"
          isRequired={true}
          type={"password"}
          onChange={() => {}}
          validType={"password"}
        />

        <TextInput
          id={"confpassword"}
          label="Confirmar Senha"
          isRequired={true}
          type={"password"}
          onChange={() => {}}
          validType={"confpassword"}
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Register;
