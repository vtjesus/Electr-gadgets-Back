// src/models/Product.ts
import { Schema, model, Document } from "mongoose";
import { TProduct } from "./product.interface";

const ProductSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const Product = model<TProduct>("Product", ProductSchema);
