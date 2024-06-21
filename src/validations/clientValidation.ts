import Joi from "joi";

export const createClientSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  phone: Joi.string()
    .pattern(/^\d{10,20}$/)
    .required(),
  cep: Joi.string()
    .pattern(/^\d{8}$/)
    .required(),
});
