import mongoose from 'mongoose';


const recieverSchema = new mongoose.Schema({   
    
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    name: { 
        type: String, 
        minlength: 2, 
        maxlength: 50, 
        required: true 
    },
    middleName: { 
        type: String, 
        minlength: 2, 
        maxlength: 50, 
        required: true 
    },
    tel: { 
        type: Number, 
        required: true 
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
        maxlength: 50 
    }  
         
})

const Reciever = mongoose.model('Reciever', recieverSchema)

export {
    Reciever
    /* recieverSchema */
}
