import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productService } from "./product.service";
import { Request, Response } from "express";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: products,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.getSingleProduct(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: product,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const updatedProduct = await productService.updateProduct(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await productService.deleteProduct(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
