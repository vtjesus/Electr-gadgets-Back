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
exports.orderService = void 0;
const order_model_1 = require("./order.model");
const product_model_1 = require("../product/product.model"); // Import the Product model
const createOrder = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
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
    const productDetails = yield Promise.all(payload.products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.Product.findById(item.product);
        if (product) {
            totalPrice += product.price * item.quantity;
            return {
                product: product._id,
                // name:product.name,
                // price:product.price,
                quantity: item.quantity,
            };
        }
        else {
            throw new Error("Product not found");
        }
    })));
    // const order = new Order({
    //   user: userId,
    //   products: productDetails,
    //   totalAmount: totalPrice,
    //   status: "Pending",
    // });
    const order = new order_model_1.Order({
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
    yield order.save();
    return order;
});
// const getAllOrders = async (userId: string) => {
//   // Query orders where the user matches the provided userId
//   const orders = await Order.find({ user: userId })
//   .select("+password")
//   // console.log(orders);
//   .populate("user") // Populate user details if needed
//   .populate("products"); // Populate product details
//   return orders;
// };
const getUserAllOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Query orders where the user matches the provided userId
    const orders = yield order_model_1.Order.find({ user: userId })
        .populate({
        path: "user",
        select: "-password", // Exclude the password field when populating the user
    })
        .populate("products"); // Populate product details
    return orders;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    // Query orders where the user matches the provided userId
    const orders = yield order_model_1.Order.find()
        .populate({
        path: "user",
        select: "-password", // Exclude the password field when populating the user
    })
        .populate("products"); // Populate product details
    return orders;
});
const getSingleOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(orderId)
        .populate("user")
        .populate("products");
    if (!order) {
        throw new Error("Order not found.");
    }
    return order;
});
const updateOrder = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the order exists
    const order = yield order_model_1.Order.findById(orderId);
    if (!order) {
        throw new Error("Order not found.");
    }
    const updatedOrder = yield order_model_1.Order.findByIdAndUpdate(orderId, { status }, { new: true, runValidators: true });
    return updatedOrder;
});
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the order exists
    const order = yield order_model_1.Order.findById(orderId);
    if (!order) {
        throw new Error("Order not found.");
    }
    const result = yield order_model_1.Order.findByIdAndDelete(orderId);
    return result;
});
exports.orderService = {
    createOrder,
    getUserAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
};
