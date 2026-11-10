import Joi from 'joi'
import { ESTADOS } from '../utils/estados'

// Mismas reglas que valida la API (postulaciones.validator.js del backend)

const ESTADOS_VALIDOS = ESTADOS.map(e => e.valor)

// Campos que se editan directamente en la fila de la tabla
export const editarFilaSchema = Joi.object({
  puesto: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'El puesto es obligatorio',
    'string.min': 'Mínimo {#limit} caracteres',
    'string.max': 'Máximo {#limit} caracteres',
    'any.required': 'El puesto es obligatorio'
  }),
  empresa: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'La empresa es obligatoria',
    'string.min': 'Mínimo {#limit} caracteres',
    'string.max': 'Máximo {#limit} caracteres',
    'any.required': 'La empresa es obligatoria'
  }),
  categoria: Joi.string().required().messages({
    'string.empty': 'Elegí una categoría',
    'any.required': 'Elegí una categoría'
  }),
  estado: Joi.string().valid(...ESTADOS_VALIDOS).required().messages({
    'any.only': 'Estado no válido',
    'any.required': 'Elegí un estado'
  })
})
