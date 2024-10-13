import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const getSingleProduct = async (productId: string) => {
  const product = await Product.findById(productId);
  return product;
};

const updateProduct = async (productId: string, payload: Partial<TProduct>) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, payload, {
    new: true, // Return the updated document
    runValidators: true, // Run validators on update
  });
  return updatedProduct;
};

const deleteProduct = async (productId: string) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};

export const productService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
