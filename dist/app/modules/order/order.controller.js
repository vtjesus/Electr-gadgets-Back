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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.createOrder(req.body, req.userId);
    // console.log(req.body)
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order Created Successfully",
        data: order,
    });
}));
const getUserAllOrders = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    // console.log(userId)
    const orders = yield order_service_1.orderService.getUserAllOrders(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Orders Retrieved Successfully",
        data: orders,
    });
}));
const getAllOrders = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_service_1.orderService.getAllOrders();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Orders Retrieved Successfully",
        data: orders,
    });
}));
const getSingleOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const order = yield order_service_1.orderService.getSingleOrder(orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order Retrieved Successfully",
        data: order,
    });
}));
const updateOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { status } = req.body;
    const updatedOrder = yield order_service_1.orderService.updateOrder(orderId, status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order Updated Successfully",
        data: updatedOrder,
    });
}));
// const updateOrder = catchAsync(async (req: Request, res: Response) => {
//   const { orderId } = req.params;
//   const { status, products, totalAmount, deliveryDate } = req.body;
//   const updates = {
//     status,
//     products,
//     totalAmount,
//     deliveryDate,
//   };
//   const updatedOrder = await orderService.updateOrder(orderId, updates);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Order Updated Successfully",
//     data: updatedOrder,
//   });
// });
const deleteOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_service_1.orderService.deleteOrder(orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.NO_CONTENT,
        success: true,
        message: "Order Deleted Successfully",
        data: result,
    });
}));
exports.orderController = {
    createOrder,
    getUserAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
};
