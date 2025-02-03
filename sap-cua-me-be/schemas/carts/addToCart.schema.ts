import Joi from 'joi';
import { idSchema } from '../products/idSchema';

// Schema for adding a product to the cart
export const addToCartSchema = Joi.object({
  productId: idSchema.extract('id').messages({
    'any.required': 'Product ID is required',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),
  color: Joi.string().optional().messages({
    'string.base': 'Color must be a string',
  }),
});