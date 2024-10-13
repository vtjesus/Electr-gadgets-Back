import express from "express";
import { productController } from "./product.controller";
import { reviewController } from "../review/review.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/create", auth(USER_ROLE.admin), productController.createProduct);
router.get("/products", productController.getAllProducts);
router.get("/product/:id", productController.getSingleProduct);
router.patch("/:id", auth(USER_ROLE.admin), productController.updateProduct);
router.delete("/:id", auth(USER_ROLE.admin), productController.deleteProduct);

//! Reviews
router.post("/:productId/review", reviewController.addReview);
router.get("/:productId/review", reviewController.getReviewsByProductId);
router.get("/reviews", reviewController.getAllReviews);


export const ProductRoutes = router;
