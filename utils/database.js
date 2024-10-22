import mongoose, { mongo } from "mongoose";

let isConnected = false;

export const connectTODB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('mongoDB is already connected');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            userNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection error:', error);
        return;
    }
}