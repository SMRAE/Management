import mongoose from 'mongoose';
/* import { recieverSchema } from '../models/reciever.js' */


/* const recieverSchema = new mongoose.Schema({

    name: { type: String, minlength: 2, maxlength: 50, required: true },
    middleName: { type: String, minlength: 2, maxlength: 50, required: true },
    tel: { type: Number, required: true },
    city: { type: String, minlength: 2, maxlength: 50, required: true },
    country: { type: String, minlength: 2, maxlength: 50 }

})  */

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true
    },
    lastName: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true
    },
    tele: {
        type: Number               
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    address: {
        type: String,
        minlength: 3,
        maxlength: 100
    },
    city: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    country: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true 
    },
    /* reciever: [ recieverSchema ] */
    },
    {
        timestamps: true
    }
)

const Customer = mongoose.model('Customer', customerSchema);

export {
    Customer
}