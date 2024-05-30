import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL);
        console.log(`\nDB connected !! DB host: ${process.env.DB_URL}`);
    } catch (error) {
        console.log('DB connection error', error);
        process.exit(1)
    }
}

export{connectDB}