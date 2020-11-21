import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById, updateOrderTopaid } from "../controlers/orderControler.js";
import { protect } from "../middileware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderTopaid);


export default router;
