import Joi from "joi";

export const savenotificationValidation = Joi.object({
    type: Joi.string().required(),

    message: Joi.string()
        .min(3)
        .max(1000)
        .required(),

    priority: Joi.string()
        .valid("LOW", "HIGH", "MEDIUM")
        .optional(),

});

export const getnotificationValidation = Joi.object({
    id: Joi.number().required(),
});