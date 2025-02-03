import Joi from 'joi';
import { idSchema } from '../products/idSchema';

// Schema for creating a new order
export const createOrderSchema = Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          productId: idSchema,
          quantity: Joi.number().integer().min(1).required().messages({
            'number.base': 'Quantity must be a number',
            'number.min': 'Quantity must be at least 1',
            'any.required': 'Quantity is required',
          }),
        })
      )
      .min(1)
      .required()
      .messages({
        'array.min': 'At least one product is required',
        'any.required': 'Products are required',
      }),
  });