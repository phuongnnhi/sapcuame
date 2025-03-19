import type { Response, NextFunction } from 'express';
import { CustomRequest } from '../..';
import { isAdmin } from '../role';

describe('[/src/middleware] isAdmin middleware', () => {
    let req: Partial<CustomRequest>;
    let res: Partial<Response>;
    let next: NextFunction;
  
    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnThis(), // Allows chaining like res.status().json()
        json: jest.fn(),
      };
      next = jest.fn();
    });
  
    test('should return 401 if no user is present', () => {
  // Call the middleware with an empty req.user
  isAdmin(req as CustomRequest, res as Response, next);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized: No user information available' });
  expect(next).not.toHaveBeenCalled();
});

test('should return 403 if user is not admin', () => {
    req.user = { role: 'user' }; // Simulate a non-admin user
  
    isAdmin(req as CustomRequest, res as Response, next);
  
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden: You do not have admin privileges' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next if user is admin', () => {
    req.user = { role: 'admin' }; // Simulate an admin user
  
    isAdmin(req as CustomRequest, res as Response, next);
  
    expect(next).toHaveBeenCalled();
  });

  test('should catch errors and return 500', () => {
    const error = new Error('test error');
  
    // Override req.user to throw an error when accessed
    Object.defineProperty(req, 'user', {
      get() {
        throw error;
      },
    });
  
    isAdmin(req as CustomRequest, res as Response, next);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
  });
  });