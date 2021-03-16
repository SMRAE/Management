import asyncHandler from 'express-async-handler';
import _ from 'lodash';
import { User } from '../models/userModel.js';


//Registering new user
const registerUser = asyncHandler(async(req, res) => {
 
  /* const { error } = validate(req.body);

  if (error) {
      return res.status(400).send(error.details[0].message);       
  }   */

  const userExists = await User.findOne({ email: req.body.email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create(
      _.pick(req.body, ["name", "email", "password", "city", "country"])   
  )

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      country: user.country,
      isAdmin: user.isAdmin,
      token: user.generateAuthToken()
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


//Login new user /api/user/login
const authUser = asyncHandler(async(req, res) => {

    const {email, password} = req.body;
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
      const token = user.generateAuthToken();
        /* res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            city: user.city,
            country: user.country,
            isAdmin: user.isAdmin,
            token: user.generateAuthToken()
        }) */
        res.send(token)
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})


export {
         registerUser,
         authUser
       }