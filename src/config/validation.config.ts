import * as Joi from "joi";

export const validationSchema = Joi.object({
	NODE_ENV: Joi.string().valid("development", "production").required(),
	PORT: Joi.number().default(8080),
});
