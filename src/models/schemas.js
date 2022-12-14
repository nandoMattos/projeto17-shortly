import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.email().required(),
  password: Joi.string().min(5).required(),
});

export const signInSchema = Joi.object({
  email: Joi.email().required(),
  password: Joi.string().min(5).required(),
});

export const urlSchema = Joi.object({
  url: Joi.string().uri().required(),
});
