const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
    try{
        const conn = await mongoose.connect(mongoURI);
        console.log('MongoDB connected: ', conn.connection.host)
    } catch(error){
        console.error('MongoDB connection error: ', error);
        throw error;  // calling code handles error
    }
};

module.exports = connectToDatabase;