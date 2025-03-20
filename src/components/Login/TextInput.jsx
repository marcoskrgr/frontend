import { useState } from "react";
import { validateEmail, validatePhone, validatePassword, validateConfPassword } from "./validTypes";

function TextInput({ id, label, isRequired, onChange, type, validType }) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const newValue = event.target.value;
        let validate;
        setValue(newValue);
        
        switch (validType) {
            case "email":
                validate = validateEmail
                break
            case "phone":
                validate = validatePhone
                break
            case "password":
                validate = validatePassword
                break
            case "confpassword":
                validate = validateConfPassword
                break
            default:
                validate = "";
        }

        if (typeof validate === 'function') {
            const validation = validate(newValue);
            if (!validation.isValid) {
                setError(validation.message);
            } else {
                setError("");
            }
        } else {
            setError("");
        }

        onChange(newValue);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: error ? "red" : "white" }}>
                {error ? error : label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={handleChange}
                required={isRequired}
            />
        </div>
    );
}

export default TextInput;