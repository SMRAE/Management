import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Joi from 'joi';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true
    },
    country: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }    
   },
   {
    timestamps: true
   }
)


//Authenticating user using JWT
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this.id,
        name: this.name,
        email: this.email,
        country: this.country,
        city: this.city,
        isAdmin: this.isAdmin
    },
    process.env.JWT || 'unsecureKey',
    {
        expiresIn: '2d',
    }
    );
    return token;
};


//Validating users
function validateUser(user) {
    const schema = {
        name: Joi.string()
                 .min(2)
                 .max(50)
                 .required(),
        email: Joi.string()
                  .min(5)
                  .max(255)
                  .required()
                  .email(),
        password: Joi.string()
                     .min(6)
                     .max(255)
                     .required(),
        country: Joi.string()
                    .min(2)
                    .max(50)
                    .required(),
        city: Joi.string()
                 .min(2)
                 .max(50)
                 .required()        
    }
    return Joi.validate(user, schema);
} 

//For Editing users password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })

const User = mongoose.model('User', userSchema);

export { 
         User,
         validateUser         
        }

    
   