// src/models/Review.ts

import mongoose, { Schema } from "mongoose";
import { TReview } from "./review.interface";

const ReviewSchema: Schema = new Schema<TReview>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product", // Refers to the Product model
      required: true,
    },
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User", // Refers to the User model
    //   // required: true,
    // },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model<TReview>("Review", ReviewSchema);
