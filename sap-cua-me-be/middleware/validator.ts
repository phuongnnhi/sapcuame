import {  Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';
import { Types } from 'mongoose';
import { CustomRequest } from "../index";

// //**
// * Generic validation middleware
// * @param {Schema} schema - Joi validation schema
// * @param {'body' | 'query' | 'params'} validationPart - Request part to validate
// */
export const validateMiddleware =
  (schema: Schema, validationPart: 'body' | 'query' | 'params') =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    const dataToValidate = req[validationPart] as Record<string, any>;

    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) {
       res.status(400).json({
        error: 'Validation error',
        details: error.details.map((detail) => detail.message),
      });
      return
    }

    next();
  };

/**
* Middleware for validating MongoDB ObjectId in request parameters
*/
export const validateParamId = (req: CustomRequest, res: Response, next: NextFunction) => {
 const { id } = req.params;

 if (!Types.ObjectId.isValid(id)) {
    res.status(400).json({
     error: 'Validation error',
     details: ['ID must be a valid MongoDB ObjectId'],
   });
   return
 }

 next();
};
