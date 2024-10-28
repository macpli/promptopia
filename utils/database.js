import mongoose from 'mongoose';

let isConnected = false;

export const connectTODB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('mongoDB is already connected');
        return;
    }

     // Retry configuration
     const maxRetries = 3; 
     const retryDelay = 1000; // Delay in milliseconds
 
     for (let attempt = 1; attempt <= maxRetries; attempt++) {
         try {
             await mongoose.connect(process.env.MONGODB_URI, {
                 dbName: "share_prompt",
                 useNewUrlParser: true,
                 useUnifiedTopology: true,
             });
 
             isConnected = true;
             console.log('MongoDB connected');
             return; // Exit if successful
 
         } catch (error) {
             console.error(`MongoDB connection attempt ${attempt} failed:`, error);
 
             // If it's the last attempt, throw the error
             if (attempt === maxRetries) {
                 console.error('All connection attempts failed');
                 throw new Error('Failed to connect to MongoDB');
             }
 
             // Wait before retrying
             await new Promise(resolve => setTimeout(resolve, retryDelay));
         }
     }
}