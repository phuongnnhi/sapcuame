import Joi from 'joi';
import { idSchema } from '../products/idSchema';

export const editReviewSchema = Joi.object({
    star: Joi.number().integer().min(1).max(5).optional().messages({
      'number.base': 'Star rating must be a number',
      'number.integer': 'Star rating must be an integer',
      'number.min': 'Star rating must be at least 1',
      'number.max': 'Star rating must be at most 5',
    }),
    review: Joi.string().max(500).optional().messages({
      'string.base': 'Review must be a string',
      'string.max': 'Review must not exceed 500 characters',
    }),
  }).min(1).messages({
    'object.min': 'At least one field (star or review) must be provided',
  });
  

  