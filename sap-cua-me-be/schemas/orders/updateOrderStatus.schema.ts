import Joi from 'joi';
import { ORDER_STATUSES } from '../../constants/productCategories';


// Schema for updating the order status (Admin only)
export const updateOrderStatusSchema = Joi.object({
    status: Joi.string()
      .valid(...ORDER_STATUSES)
      .required()
      .messages({
        'any.only': 'Invalid order status',
        'any.required': 'Order status is required',
      }),
  });