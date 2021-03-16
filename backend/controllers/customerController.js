import asyncHandler from 'express-async-handler';
import _ from 'lodash';
import { Customer } from '../models/customerModel.js';


//Registering new Customer 
const registerCustomer = asyncHandler(async(req, res) => {
      
      const customerExists = await Customer.findOne({ firstName: req.body.firstName } && { lastName: req.body.lastName } && { tele: req.body.tele })

      if(customerExists) {
          res.status(400)
          throw new Error('Customer Exists'); 
      }

      const customer = await Customer.create(
          _.pick(req.body, ["firstName", "lastName", "tele", "email", "address", "city", "country"])
      )
      
      if(customer) {
          res.status(201).json({
              _id: customer._id,
              firstName: customer.firstName,
              lastName: customer.lastName,
              tele: customer.tele,
              email: customer.email,              
              address: customer.address,
              city: customer.city,
              country: customer.country          
          })
      } else {
             res.status(400)
             throw new Error('Invalid Customer');
      }
})


//Getting all customers
const getAllCustomers = asyncHandler(async(req, res) => {
    const customers = await Customer.find({}).populate('reciever')
    if(customers != 0){
        res.status(200)
        res.json(customers)
    } else {
        res.status(404)
        throw new Error('No customers found')
    }    
})


//Get a Customer by id
const getCustomer = asyncHandler(async(req, res) => {
    const customer = await Customer.findById(req.params.id)                                   
    if(customer) {
        res.status(200).json(customer)
    } else {
        res.status(404)
        throw new Error('No customer found with this id')
    }
})

export {
    registerCustomer,
    getAllCustomers,
    getCustomer
}