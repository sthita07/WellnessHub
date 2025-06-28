const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI);
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully to:', conn.connection.host);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
module.exports = connectDB;