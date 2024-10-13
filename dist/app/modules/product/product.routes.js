"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const review_controller_1 = require("../review/review.controller");
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post("/create", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), product_controller_1.productController.createProduct);
router.get("/products", product_controller_1.productController.getAllProducts);
router.get("/product/:id", product_controller_1.productController.getSingleProduct);
router.patch("/:id", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), product_controller_1.productController.updateProduct);
router.delete("/:id", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), product_controller_1.productController.deleteProduct);
//! Reviews
router.post("/:productId/review", review_controller_1.reviewController.addReview);
router.get("/:productId/review", review_controller_1.reviewController.getReviewsByProductId);
router.get("/reviews", review_controller_1.reviewController.getAllReviews);
exports.ProductRoutes = router;
