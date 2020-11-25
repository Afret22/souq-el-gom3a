import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderTopaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controlers/orderControler.js";
import { isAdmin, protect } from "../middileware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders);

router.route("/myorders").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderTopaid);

router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);

export default router;
