const Joi=require('joi')
const validateCompanySchema = Joi.object({
    companyHrContact: Joi.string().email().required().trim(),
    companyType: Joi.string().valid('min','sde').required().trim(),
    companyName: Joi.string().required().trim(),
    positionRole: Joi.string().required().trim(),
    hiringManagerName: Joi.string().optional().trim()
});

module.exports = validateCompanySchema;