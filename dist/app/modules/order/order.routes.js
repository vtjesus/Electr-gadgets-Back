"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post("/create", (0, auth_1.auth)(user_constant_1.USER_ROLE.user), order_controller_1.orderController.createOrder); // Create a new order
router.get("/user-orders", (0, auth_1.auth)(user_constant_1.USER_ROLE.user), order_controller_1.orderController.getUserAllOrders); // Get all orders
router.get("/all-orders", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), order_controller_1.orderController.getAllOrders); // Get all orders
router.get("/:orderId", order_controller_1.orderController.getSingleOrder); // Get a single order by ID
router.patch("/:orderId", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), order_controller_1.orderController.updateOrder); // Update an order by ID
router.delete("/:orderId", order_controller_1.orderController.deleteOrder); // Delete an order by ID
exports.OrderRoutes = router;
