import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../utils/cloudinaryConfig";
import upload from "../uploadMiddleware";

// Mocking CloudinaryStorage and multer
jest.mock("multer-storage-cloudinary", () => ({
  CloudinaryStorage: jest.fn().mockImplementation(() => ({
    _handleFile: jest.fn(),
    _removeFile: jest.fn(),
  })),
}));

jest.mock("multer", () => jest.fn(() => ({ single: jest.fn() })));

jest.mock("../../utils/cloudinaryConfig", () => ({
  v2: {
    uploader: {
      upload: jest.fn(),
    },
    config: jest.fn(),
  },
}));

describe("Upload Middleware", () => {
  test("should configure CloudinaryStorage correctly", async () => {
    expect(CloudinaryStorage).toHaveBeenCalledWith({
      cloudinary,
      params: expect.any(Function),
    });

    const params = await (CloudinaryStorage as jest.Mock).mock.calls[0][0].params({}, {});

    expect(params.folder).toBe("products");
    expect(params.format).toBe("jpg");
    expect(params.allowed_formats).toEqual(["jpg", "png", "jpeg", "heic", "heif"]);
    expect(params.resource_type).toBe("auto");
  });

  test("should configure multer with CloudinaryStorage", () => {
    expect(multer).toHaveBeenCalledWith({ storage: expect.any(Object) });
  });

  test("should export a valid multer instance", () => {
    expect(upload).toHaveProperty("single");
  });
});