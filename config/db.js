import mongoose from "mongoose";
const MONGO_URI = 'mongodb://localhost:27017/bookStore'
const connectDb = () => {
    try {
        mongoose.connect(MONGO_URI);
        console.log('db connected succefully...');
        
    } catch (err) {
        console.log(err);
        
    }
}

export default connectDb;