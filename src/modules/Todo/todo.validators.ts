import Joi = require("joi");

const idSchema = Joi.string().guid({
  version: "uuidv4",
});

const todoSchema = Joi.object({
  id: idSchema.alter({
    create: (schema) => schema.forbidden(),
    update: (schema) => schema.required(),
  }),
  title: Joi.string().max(256).required(),
  completed: Joi.boolean().required(),
});

export const validateCreate = (payload: any) => {
  return todoSchema.tailor("create").validate(payload, {
    abortEarly: false,
    stripUnknown: true,
  });
};

export const validateId = (id: any) => {
  return idSchema.validate(id);
};

export const validateUpdate = (payload: any) => {
  return todoSchema.tailor("update").validate(payload, {
    abortEarly: false,
    stripUnknown: true,
  });
};
