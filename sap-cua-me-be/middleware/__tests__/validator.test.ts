import { validateMiddleware, validateParamId } from '../validator';
import { addToCartSchema } from '../../schemas/carts/addToCart.schema';
import { Types } from 'mongoose';

describe('Validation Middleware Tests', () => {
  let req: any, res: any, next: jest.Mock;

  beforeEach(() => {
    req = { body: {}, params: {} }; // Mock request object
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('validateMiddleware', () => {
    it('should call next() when data is valid', () => {
      req.body = {
        productId: new Types.ObjectId().toHexString(),
        quantity: 2,
        color: 'red',
      };

      validateMiddleware(addToCartSchema, 'body')(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 if productId is missing', () => {
      req.body = {
        quantity: 2,
        color: 'red',
      };

      validateMiddleware(addToCartSchema, 'body')(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Validation error',
        details: expect.arrayContaining(['Product ID is required']),
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 if quantity is invalid', () => {
      req.body = {
        productId: new Types.ObjectId().toHexString(),
        quantity: 0, // Invalid, must be at least 1
      };

      validateMiddleware(addToCartSchema, 'body')(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Validation error',
        details: expect.arrayContaining(['Quantity must be at least 1']),
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateParamId', () => {
    it('should call next() when ID is valid', () => {
      req.params.id = new Types.ObjectId().toHexString();

      validateParamId(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 if ID is invalid', () => {
      req.params.id = 'invalid123';

      validateParamId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Validation error',
        details: ['ID must be a valid MongoDB ObjectId'],
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});