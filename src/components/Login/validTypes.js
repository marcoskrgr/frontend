export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: "Formato de e-mail inválido!" };
    }
    return { isValid: true, message: "" };
};

export const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(phone)) {
        return { isValid: false, message: "Telefone deve ter 10 ou 11 números!" };
    }
    return { isValid: true, message: "" };
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{10,}$/;
    if (!passwordRegex.test(password)) {
        return { isValid: false, message: "A senha deve ter pelo menos 10 dígitos, letras e números!" };
    }
    return { isValid: true, message: "" };
};

export const validateConfPassword = (confpassword) => {
    const password = document.getElementById("password").value

    if (password != confpassword) {
        return { isValid: false, message: "As duas senhas devem ser iguais!" };
    }
    return { isValid: true, message: "" };
};