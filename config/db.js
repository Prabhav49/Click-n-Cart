import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB Database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error IN MongoDB ${error}`)
    }
}

export default connectDB;