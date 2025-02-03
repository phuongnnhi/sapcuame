import Joi from 'joi';
import { idSchema } from '../products/idSchema';

// Schema for submitting a review
export const submitReviewSchema = Joi.object({
    productId: idSchema.extract('id').messages({
      'any.required': 'Product ID is required',
    }),
    star: Joi.number().integer().min(1).max(5).required().messages({
      'number.base': 'Star rating must be a number',
      'number.integer': 'Star rating must be an integer',
      'number.min': 'Star rating must be at least 1',
      'number.max': 'Star rating must be at most 5',
      'any.required': 'Star rating is required',
    }),
    review: Joi.string().max(500).optional().messages({
      'string.base': 'Review must be a string',
      'string.max': 'Review must not exceed 500 characters',
    }),
  });