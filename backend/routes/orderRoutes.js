import express from 'express';
const router = express.Router();

import { createOrder, getAllOrders, getOrders } from '../controllers/orderController.js'

router.route('/')
      .post(createOrder);
router.route('/')
      .get(getAllOrders);
router.route('/:id')
      .get(getOrders);


export default router;