import { Schema } from "mongoose";

export type TOrder = {
  user: Schema.Types.ObjectId; // User ID (reference to User model)
  // products: { productId: Schema.Types.ObjectId; quantity: number }[];
  // user: {
  //   userName: string;
  //   uerEmail: string;
  // };
  products: Array<{
    product: Schema.Types.ObjectId;
    quantity: number;
    // name:string;
    // price:number
  }>;
  totalAmount: number; // Total amount for the order
  status: "Pending" | "Delivered" | "Cancelled"; // Order status
  // paymentMethod: string;
};
