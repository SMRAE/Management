import asyncHandler from 'express-async-handler';
import _ from 'lodash';
import { Order } from '../models/orderModel.js';

//Creating new order 
const createOrder = asyncHandler(async(req, res) => {
    const newOrder = await Order.create(
        _.pick(req.body, ["employer", "amountHard", "rate", "amountLocal", 
                          "fee", "employee", "from", "to", "isDelivered", "isPaid"])
        )
    if(newOrder) {       
        res.status(201).json(newOrder);
    } else {
        res.status(400)
        throw new Error('Failed to create new order')
    }
})

//Getting all orders
const getAllOrders = asyncHandler(async(req, res) => {
    
    const orders = await Order.find({})
                              .populate('employer', 'name -_id')
                              .populate('employee', 'name -_id')
                              .populate('from', 'firstName -_id')
                              .populate('to', 'name -_id')                                                   

    if(orders) {
        res.status(200).json(orders)
    } else {
        res.status(404)
        throw new Error('No orders found')
    }
})

//Get orders by customer id 
const getCustomerOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({from: req.params.id})
                              .populate('employer', 'name -_id')
                              .populate('employee', 'name -_id')
                              .populate('from', 'firstName lastName -_id')
                              .populate('to', 'name middleName -_id')   
    
    if(orders) {
        res.status(200).json(orders)
    } else {
        res.status(404)
        throw new Error('No orders found with this id')
    }
}) 

//Get customer by user id 
const getEmployeeOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({ employee: req.params.id })
                              .populate('employer', 'name -_id')
                              .populate('employee', 'name -_id')
                              .populate('from', 'firstName lastName -_id')
                              .populate('to', 'name middleName -_id') 
    if(orders) {
        res.status(200).json(orders)
    } else {
        res.status(404)
        throw new Error('No orders found for this employee')
    }
})

export {
    createOrder,
    getAllOrders,
    getCustomerOrders,
    getEmployeeOrders
}