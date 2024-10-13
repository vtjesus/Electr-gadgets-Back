"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
// src/models/Product.ts
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: false },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
