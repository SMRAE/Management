import express from 'express';
const router = express.Router();

import { createOrder, getAllOrders, getCustomerOrders, getEmployeeOrders } from '../controllers/orderController.js'

router.route('/')
      .post(createOrder);
router.route('/')
      .get(getAllOrders);
router.route('/customer/:id')
      .get(getCustomerOrders);
router.route('/employee/:id')
      .get(getEmployeeOrders);


export default router;