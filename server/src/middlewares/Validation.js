const Joi = require('joi');


const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        let errorMessage = error.details[0].message;
        errorMessage = errorMessage.replace(/\"/g, ''); // Remove quotes
        errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1); // Capitalize first letter
        return res.status(400).json({ message: errorMessage, success: false });
    }
    next();
};


const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        let errorMessage = error.details[0].message;
        errorMessage = errorMessage.replace(/\"/g, ''); // Remove quotes
        errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1); // Capitalize first letter
        return res.status(400).json({ message: errorMessage, success: false });
    }
    next();
};



module.exports = {
    signupValidation,
    loginValidation
}