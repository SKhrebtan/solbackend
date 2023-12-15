const Joi = require('joi');

exports.createUserDataValidator = (data) =>
  Joi.object().options({ abortEarly: false }).keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.regex(/^\+?3?8?(0[5-9][0-9]\d{7})$/).required(),
  }).validate(data);
