const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://rootuser:rootpassword@mongodb:27017/FeedDB?authSource=admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err.message);
        process.exit(1); // Optionally exit process if DB connection fails
    }
};

module.exports = connectDB;
