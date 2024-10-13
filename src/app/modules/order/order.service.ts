import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { Product } from "../product/product.model"; // Import the Product model
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const createOrder = async (payload: TOrder, userId: JwtPayload) => {
  // console.log(payload);
  // Check if all products exist
  // const productsExist = await Promise.all(
  //   payload.products.map(async (item: any) =>
  //     Product.exists({ _id: item._id })
  //   )
  // );

  // if (productsExist.includes(null)) {
  //   throw new AppError(httpStatus.NOT_FOUND, "One or more products not found");
  // }

  let totalPrice = 0;

  // Calculate the total price
  const productDetails = await Promise.all(
    payload.products.map(async (item: any) => {
      const product = await Product.findById(item.product);
      if (product) {
        totalPrice += product.price * item.quantity;
        return {
          product: product._id,
          // name:product.name,
          // price:product.price,
          quantity: item.quantity,
        };
      } else {
        throw new Error("Product not found");
      }
    })
  );

  // const order = new Order({
  //   user: userId,
  //   products: productDetails,
  //   totalAmount: totalPrice,
  //   status: "Pending",
  // });

  const order = new Order({
    // user: {
    //   userName: user.name,
    //   userEmail: user.email,
    // },
    user: userId,
    products: productDetails,
    totalAmount: totalPrice,
    status: payload.status || "Pending",
    paymentMethod: "Cash On Delivery",
  });

  await order.save();
  return order;
};

// const getAllOrders = async (userId: string) => {
//   // Query orders where the user matches the provided userId
//   const orders = await Order.find({ user: userId })
//   .select("+password")

//   // console.log(orders);
//   .populate("user") // Populate user details if needed
//   .populate("products"); // Populate product details

//   return orders;
// };

const getUserAllOrders = async (userId: string) => {
  // Query orders where the user matches the provided userId
  const orders = await Order.find({ user: userId })
    .populate({
      path: "user",
      select: "-password", // Exclude the password field when populating the user
    })
    .populate("products"); // Populate product details

  return orders;
};

const getAllOrders = async () => {
  // Query orders where the user matches the provided userId
  const orders = await Order.find()
    .populate({
      path: "user",
      select: "-password", // Exclude the password field when populating the user
    })
    .populate("products"); // Populate product details

  return orders;
};

const getSingleOrder = async (orderId: string) => {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate("products");

  if (!order) {
    throw new Error("Order not found.");
  }

  return order;
};

const updateOrder = async (
  orderId: string,
  status: "Pending" | "Delivered" | "Cancelled"
) => {
  // Check if the order exists
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found.");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true }
  );


  return updatedOrder;
};

const deleteOrder = async (orderId: string) => {
  // Check if the order exists
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found.");
  }

  const result = await Order.findByIdAndDelete(orderId);
  return result;
};

export const orderService = {
  createOrder,
  getUserAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
};
