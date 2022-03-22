const jwt = require('jsonwebtoken');

const validationEmail = (email) => {
  const response =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return response.test(String(email).toLocaleLowerCase());
};

const validationPassword = (password) => {
  const response =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/;
  return response.test(String(password));
};

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const setError = (code, message) => {
  const error = new Error();
  error.code = code;
  error.message = message;
  return error;
};

module.exports = {
  generateToken,
  setError,
  validationEmail,
  validationPassword,
  verifyToken
};
