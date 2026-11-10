import Joi from 'joi'
import { ESTADOS } from '../utils/estados'

// Mismas reglas que valida la API (postulaciones.validator.js del backend)

const ESTADOS_VALIDOS = ESTADOS.map(e => e.valor)

// Formulario de alta: los 7 campos que acepta la API
export const crearPostulacionSchema = Joi.object({
  puesto: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'El puesto es obligatorio',
    'string.min': 'El puesto debe tener al menos {#limit} caracteres',
    'string.max': 'El puesto no puede superar los {#limit} caracteres',
    'any.required': 'El puesto es obligatorio'
  }),
  empresa: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'La empresa es obligatoria',
    'string.min': 'La empresa debe tener al menos {#limit} caracteres',
    'string.max': 'La empresa no puede superar los {#limit} caracteres',
    'any.required': 'La empresa es obligatoria'
  }),
  categoria: Joi.string().required().messages({
    'string.empty': 'Elegí una categoría',
    'any.required': 'Elegí una categoría'
  }),
  estado: Joi.string().valid(...ESTADOS_VALIDOS).required().messages({
    'any.only': 'Estado no válido',
    'any.required': 'Elegí un estado'
  }),
  descripcion: Joi.string().trim().min(10).max(5000).required().messages({
    'string.empty': 'La descripción es obligatoria',
    'string.min': 'La descripción debe tener al menos {#limit} caracteres',
    'string.max': 'La descripción no puede superar los {#limit} caracteres',
    'any.required': 'La descripción es obligatoria'
  }),
  // Opcionales: allow('') permite dejarlos vacíos (la API también lo permite)
  enlace: Joi.string().trim().uri({ scheme: ['http', 'https'] }).max(2000).allow('').messages({
    'string.uri': 'Ingresá un enlace válido (empezando con http:// o https://)',
    'string.uriCustomScheme': 'El enlace debe empezar con http:// o https://',
    'string.max': 'El enlace no puede superar los {#limit} caracteres'
  }),
  notas: Joi.string().trim().max(2000).allow('').messages({
    'string.max': 'Las notas no pueden superar los {#limit} caracteres'
  })
})

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
