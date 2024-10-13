"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const product_model_1 = require("../product/product.model");
const review_model_1 = require("./review.model");
const addReview = (reviewData, productId) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(productId);
    const session = yield review_model_1.Review.startSession();
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new Error("product not found");
    }
    try {
        session.startTransaction();
        const review = yield review_model_1.Review.create([
            Object.assign({ productId: product._id }, reviewData),
        ], { session });
        yield session.commitTransaction();
        return review[0];
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getReviewsByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find({ productId });
    // .populate(
    //   "userId",
    //   "name email"
    // ); // Populate user details if needed
    return reviews;
});
// New function to get all reviews
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find(); // Retrieves all reviews from the database
    return reviews;
});
exports.reviewService = {
    addReview,
    getReviewsByProductId,
    getAllReviews
};
