import asyncHandler from 'express-async-handler';
import _ from 'lodash';
import { Reciever } from '../models/reciever.js'


//Creating a reciever for registered customer
const registerReciever = asyncHandler(async(req, res) => {

      const reciever = await Reciever.create(
          _.pick(req.body, ["customer", "name", "middleName", "tel", "city", "country"])
      )
      
      if(reciever) {
          res.status(201).json(reciever)
      } else {
          throw new Error('Error creating new reciever to a registered customer')
      } 
})

//Getting all recievers with respective Customers 
const getAllRecievers = asyncHandler(async(req, res) => {
    const recievers = await Reciever.find({}).populate('customer', 'firstName lastName -_id');
    if (recievers) {
      res.status(200).json(recievers)
    } else {
        res.status(404)
        throw new Error('No recivers found');
    }
})

//Get all recivers of a customer
const getRecievers = asyncHandler(async(req, res) => {
    const recievers = await Reciever.find({ customer: req.params.id }).populate('customer', 'firstName lastName -_id');
    if(recievers) {
        res.status(200).json(recievers)
    } else {
        res.status(404)
        throw new Error('no recievres found with a given id')
    }
})

export {
    registerReciever,
    getAllRecievers,
    getRecievers
}