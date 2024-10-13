import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";
import { string } from "zod";

const orderSchema: Schema = new Schema<TOrder>(
  {
    // user: {
    //   userName: { type: String },
    //   userEmail: { type: String },
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        // name: {
        //   type: String,
        //   required: true,
        // },
        // price: {
        //   type: Number,
        //   required: true,
        // },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
    // paymentMethod: {
    //   type: String,
    //   default: "Cash On Delivery",
    // },
  },

  { timestamps: true }
);

const Order = mongoose.model<TOrder>("Order", orderSchema);

export { Order };
