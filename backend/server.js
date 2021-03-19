import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

import userRoutes from './routes/userRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reciverRoutes from './routes/recieverRoutes.js'


app.use(express.json());
app.use(cors());
app.use('/api/user', userRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/reciever', reciverRoutes);



const db = process.env.MONGODB_URL || 'mongodb://localhost/hawala';
console.log(db);


mongoose.connect(db, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to database ...'))
    .catch((err) => console.log('Failed to connect to database', err));



const port = process.env.PORT || 4003;
app.listen(port, () => console.log(`Server listens on port ${port}`));

