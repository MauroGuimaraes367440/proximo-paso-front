import Joi from 'joi'

export const busquedaOfertasSchema = Joi.object({
  busqueda: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Escribí qué puesto buscás',
    'string.min': 'Al menos {#limit} caracteres',
    'string.max': 'Máximo {#limit} caracteres',
    'any.required': 'Escribí qué puesto buscás'
  }),
  ubicacion: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Escribí una ubicación',
    'string.min': 'Al menos {#limit} caracteres',
    'string.max': 'Máximo {#limit} caracteres',
    'any.required': 'Escribí una ubicación'
  })
})
