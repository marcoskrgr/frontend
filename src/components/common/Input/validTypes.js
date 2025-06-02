export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
  return phoneRegex.test(phone);
};

export const unformatPhone = (phone) => {
  return phone.replace(/\D/g, '');
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(password);
};

export const formatPhone = (value) => {
  const onlyNumbers = value.replace(/\D/g, '');

  if (onlyNumbers.length < 3) {
    return onlyNumbers;
  }

  const ddd = onlyNumbers.slice(0, 2);
  const number = onlyNumbers.slice(2);

  if (number.length <= 4) {
    return `(${ddd}) ${number}`;
  } else if (number.length <= 8) {
    return `(${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`;
  } else {
    return `(${ddd}) ${number.slice(0, 5)}-${number.slice(5, 9)}`;
  }
};
