import { Schema } from "mongoose";

export type TReview = {
  productId: Schema.Types.ObjectId; // ID of the product being reviewed
  // userId: Schema.Types.ObjectId; // ID of the user who left the review
  review: string; // Review text
  rating: number; // Rating (1-5)
  // createdAt: Date;
};
