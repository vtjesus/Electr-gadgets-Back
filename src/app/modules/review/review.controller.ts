import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { reviewService } from "./review.service";

const addReview = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  // console.log(productId)
  const review = await reviewService.addReview(req.body, productId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review Created Successfully",
    data: review,
  });
});

const getReviewsByProductId = catchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const reviews = await reviewService.getReviewsByProductId(productId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
    });
  }
);


// New getAllReviews controller
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const reviews = await reviewService.getAllReviews(); // Fetch all reviews
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All reviews fetched successfully",
    data: reviews,
  });
});

export const reviewController = {
  addReview,
  getReviewsByProductId,
  getAllReviews
};
