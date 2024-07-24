const Joi=require('joi')
const validateProjectSchema = Joi.object({
    projectTitle: Joi.string().required().trim(),
    projectType: Joi.string().valid('min','sde').required().trim(),
    projectGithubLink:Joi.string().required().trim(),
    projectDescription:Joi.string().required().trim(),
});

module.exports = validateProjectSchema;