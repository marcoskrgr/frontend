const registerInputs = {
    canSubmit: false,
    inputs: [
      { id: "name", label: "Nome", isRequired: true, type: "text", error: "", value: "" },
      { id: "surName", label: "Sobrenome", isRequired: true, type: "text", error: "", value: "" },
      { id: "email", label: "E-mail", isRequired: true, type: "email", error: "", value: "" },
      { id: "phone", label: "Telefone", isRequired: true, type: "tel", error: "", value: "" },
      { id: "password", label: "Senha", isRequired: true, type: "password", error: "", value: "" },
      { id: "confPass", label: "Confirmar Senha", isRequired: true, type: "password", error: "", value: "" }
    ]
  };
  
export default registerInputs;