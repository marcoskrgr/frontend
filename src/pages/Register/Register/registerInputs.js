const registerInputs = {
    canSubmit: false,
    inputs: [
      { id: "name", label: "Nome", inputMode: "text", isRequired: true, type: "text", error: "", value: "" },
      { id: "surName", label: "Sobrenome", inputMode: "text", isRequired: true, type: "text", error: "", value: "" },
      { id: "email", label: "E-mail", inputMode: "email", isRequired: true, type: "email", error: "", value: "" },
      { id: "phone", label: "Telefone", inputMode: "tel", isRequired: true, type: "tel", error: "", value: "" },
      { id: "password", label: "Senha", inputMode: "text", isRequired: true, type: "password", error: "", value: "" },
      { id: "confPass", label: "Confirmar Senha", inputMode: "text", isRequired: true, type: "password", error: "", value: "" }
    ]
  };
  
export default registerInputs;
