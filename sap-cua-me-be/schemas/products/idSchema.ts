import Joi from 'joi';
import { Types } from 'mongoose';

export const idSchema = Joi.object({
    id: Joi.string()
      .custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value; // Valid MongoDB ObjectId
      })
      .required()
      .messages({
        'any.invalid': 'ID must be a valid MongoDB ObjectId',
        'any.required': 'ID is required',
      }),
  });