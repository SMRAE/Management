import express from 'express';
import { registerReciever, getAllRecievers, getRecievers } from '../controllers/recieverController.js';

const router = express.Router();

router.route('/')
      .post(registerReciever)  
router.route('/') 
      .get(getAllRecievers)  
router.route('/:id')
      .get(getRecievers)  


export default router;