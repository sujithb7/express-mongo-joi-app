// validators/userValidator.js
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(1).max(120).required()
});

module.exports = userSchema;
