import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { authenticateUser } from "../authMiddleware";

// Mock Mongoose User model
jest.mock("../../models/User", () => ({
    findById: jest.fn(),
}));

// Mock jsonwebtoken
jest.mock("jsonwebtoken", () => ({
    verify: jest.fn(),
}));

describe("authenticateUser Middleware", () => {
    let mockReq: any;
    let mockRes: Response;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = { headers: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as any;
        mockNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should return 401 if no authorization header is provided", async () => {
        await authenticateUser(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Unauthorized: No token provided" });
    });

    test("should return 401 if token is not in 'Bearer' format", async () => {
        mockReq.headers.authorization = "InvalidToken";

        await authenticateUser(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Unauthorized: No token provided" });
    });

    test("should return 401 if token is invalid", async () => {
        mockReq.headers.authorization = "Bearer invalidToken";

        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error("Invalid token");
        });

        await authenticateUser(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Unauthorized: Invalid token" });
    });

    test("should return 401 if token is expired", async () => {
        mockReq.headers.authorization = "Bearer expiredToken";

        (jwt.verify as jest.Mock).mockImplementation(() => {
            const error: any = new Error("Token expired");
            error.name = "TokenExpiredError";
            throw error;
        });

        await authenticateUser(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Token expired, please refresh" });
    });

    test("should return 404 if user is not found", async () => {
        mockReq.headers.authorization = "Bearer validToken";

        (jwt.verify as jest.Mock).mockReturnValue({ id: "userId123" });
        (User.findById as jest.Mock).mockResolvedValue(null); // Simulate user not found

        await authenticateUser(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    test("should attach user to request and call next() if authentication is successful", async () => {
        mockReq.headers.authorization = "Bearer validToken";

        const fakeUser = {
            _id: "userId123",
            name: "John Doe",
            email: "john@example.com",
            role: "user",
        };

        (jwt.verify as jest.Mock).mockReturnValue({ id: "userId123" });
        (User.findById as jest.Mock).mockResolvedValue(fakeUser);

        await authenticateUser(mockReq, mockRes, mockNext);

        // Verify user is attached to the request
        expect(mockReq.user).toEqual(fakeUser);
        expect(mockNext).toHaveBeenCalled();
    });
});