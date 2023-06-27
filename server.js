import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'

//Configure ENV
dotenv.config()

//database config
connectDB();

//rest object
const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);

//rest API
app.get('/', (req,res) => {
    res.send({
        message: "Welcome"
    })
})

//PORT
const PORT = process.env.PORT || 5000;

//Run listen
app.listen(PORT, () =>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode ${PORT}`);
})
