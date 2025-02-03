import Joi from 'joi';

// Schema for updating a cart item (quantity update)
export const updateCartItemSchema = Joi.object({
    quantity: Joi.number().integer().min(1).optional().messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity must be at least 1',
    }),
  }).min(1).messages({
    'object.min': 'At least one field (quantity) must be provided',
  });