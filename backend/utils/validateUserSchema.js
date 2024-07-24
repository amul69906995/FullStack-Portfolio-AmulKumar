const Joi=require('joi')
const validateUserSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).required().trim(),
});

module.exports = validateUserSchema;