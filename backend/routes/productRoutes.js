import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from "../controlers/productControler.js";
import { isAdmin, protect } from "../middileware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.get('/top', getTopProducts)
router.route("/:id/reviews").post(protect, createProductReview);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

export default router;
