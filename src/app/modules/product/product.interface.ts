// src/interfaces/IProduct.ts
export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  brand:string
  stock: number;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
