const Joi = require('joi');

const phoneRegex = /^\+?3?8?(0[5-9][0-9]\d{7})$/;
exports.createUserDataValidator = (data) =>
  Joi.object().options({ abortEarly: false }).keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(phoneRegex).required(),
  }).validate(data);
