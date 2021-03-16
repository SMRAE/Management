import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
     employer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
     },
     amountHard: {
         type: Number,         
         required: true
     },
     rate: {
         type: Number,         
         required: true
     },
     amountLocal: {
         type: Number,         
         required: true
     },
     fee: {
         type: Number,        
         required: true
     },    
     employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
     },              
     from: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer',
     },
     to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Reciever',
     },
     isPaid: {
        type: Boolean,
        required: true,
        default: true
    },
    isDelivered: {
        type: Boolean,
        default: false,
        required: true
    }     
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema);

export {
    Order
}