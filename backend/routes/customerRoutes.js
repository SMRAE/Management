import express from 'express';
const router = express.Router()

import { registerCustomer, getAllCustomers, getCustomer } from '../controllers/customerController.js';


router.route('/')
      .post(registerCustomer);
router.route('/')
      .get(getAllCustomers);
router.route('/:id')
      .get(getCustomer)
      

export default router;