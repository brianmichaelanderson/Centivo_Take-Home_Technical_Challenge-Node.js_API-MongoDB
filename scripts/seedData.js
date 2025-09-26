const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const seedUsers = [
  { name: 'John Doe', email: 'johndoe@email.com', age: 30 },
  { name: 'Jane Smith', email: 'janesmith@email.com', age: 25 },
  { name: 'Alice Johnson', email: 'alicejohnson@email.com', age: 19 }, // Under 21 shouldn't return
  { name: 'Bob Brown', email: 'bobbrown@email.com', age: 28 },
  { name: 'Tom Young', email: 'tomyound@email.com', age: 20 }, // Under 21 shouldn't return
];

const seedDatabase = async () => {
    try{
        await(mongoose.connect(mongoURI));
        console.log('MongoDB connected for seeding: ', mongoURI);

        // Clear existing users
        await User.deleteMany({});
        console.log('Existing users cleared');

        // Insert seed users into DB
        const users = await User.insertMany(seedUsers);
        console.log('Database seeded with the following user data: ');
        users.forEach(user => {
            console.log(`${user.name}(age: ${user.age}): ${user._id}`);
        })

        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0); // Exit - script succeeded
    } catch(error) {
        console.error('Seeding of the database failed: ', error);
        mongoose.connection.close();
        console.log('MongoDB connection closed after seeding failed');
        process.exit(1); // Exit - script failed
    }
};

seedDatabase();