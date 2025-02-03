import Joi from "joi";
import { PRODUCT_CATEGORIES } from "../../constants/productCategories";

export const createProductSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Product name is required',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Description is required',
    }),
    image: Joi.string().uri().optional().messages({
      'string.uri': 'Image must be a valid URL',
    }),
    productType: Joi.string().required().messages({
      'string.empty': 'Product type is required',
    }),
    brand: Joi.string().required().messages({
      'string.empty': 'Brand is required',
    }),
    category: Joi.array()
      .items(
        Joi.string().valid(...PRODUCT_CATEGORIES)
      )
      .min(1)
      .required()
      .messages({
        'array.min': 'At least one category is required',
        'any.only': 'Invalid category value',
      }),
    price: Joi.number().positive().required().messages({
      'number.positive': 'Price must be a positive number',
      'number.base': 'Price must be a number',
      'any.required': 'Price is required',
    }),
    tags: Joi.array()
    .items(Joi.string().min(1).max(50))
    .min(1)
    .optional(),
    size: Joi.array().items(Joi.string()).optional().messages({
      'array.base': 'Size must be an array of strings',
    }),
    colors: Joi.array().items(Joi.string()).optional().messages({
      'array.base': 'Colors must be an array of strings',
    }),
    isAvailable: Joi.boolean().optional().messages({
      'boolean.base': 'isAvailable must be a boolean',
    }),
  });