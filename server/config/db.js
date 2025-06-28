const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn=await mongoose.connect('mongodb+srv://sahoosthitapragnya:shaan123@shaan.fmimhme.mongodb.net/?retryWrites=true&w=majority&appName=Shaan');
        console.log('MongoDB connected successfully to:', conn.connection.host);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
module.exports = connectDB;