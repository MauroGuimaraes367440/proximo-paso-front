import Joi from 'joi'

// Mismas reglas que valida la API (auth.validator.js del backend)

export const loginSchema = Joi.object({
  username: Joi.string().trim().required().messages({
    'string.empty': 'Ingresá tu usuario',
    'any.required': 'Ingresá tu usuario'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Ingresá tu contraseña',
    'any.required': 'Ingresá tu contraseña'
  })
})

export const registroSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    'string.empty': 'El usuario es obligatorio',
    'string.min': 'El usuario debe tener al menos {#limit} caracteres',
    'string.max': 'El usuario no puede superar los {#limit} caracteres',
    'any.required': 'El usuario es obligatorio'
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
    'string.max': 'La contraseña no puede superar los {#limit} caracteres',
    'any.required': 'La contraseña es obligatoria'
  }),
  // Joi.ref compara contra el valor del campo password
  repetirPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'string.empty': 'Repetí la contraseña',
    'any.only': 'Las contraseñas no coinciden',
    'any.required': 'Repetí la contraseña'
  })
})
