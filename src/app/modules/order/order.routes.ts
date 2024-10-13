import express from "express";
import { orderController } from "./order.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/create", auth(USER_ROLE.user), orderController.createOrder); // Create a new order
router.get(
  "/user-orders",
  auth(USER_ROLE.user),
  orderController.getUserAllOrders
); // Get all orders
router.get("/all-orders", auth(USER_ROLE.admin), orderController.getAllOrders); // Get all orders
router.get("/:orderId", orderController.getSingleOrder); // Get a single order by ID

router.patch("/:orderId", auth(USER_ROLE.admin), orderController.updateOrder); // Update an order by ID
router.delete("/:orderId", orderController.deleteOrder); // Delete an order by ID

export const OrderRoutes = router;
