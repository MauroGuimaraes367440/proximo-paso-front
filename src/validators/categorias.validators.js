import Joi from 'joi'

export const categoriaSchema = Joi.object({
  nombre: Joi.string().trim().lowercase().min(2).max(50).required().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre no puede superar los {#limit} caracteres',
    'any.required': 'El nombre es obligatorio'
  })
})

export const TIPOS_IMAGEN = ['image/jpeg', 'image/png', 'image/webp']
export const TAMANO_MAXIMO = 3 * 1024 * 1024
