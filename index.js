const app = require('./app');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/database');

dotenv.config();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log('Server running on port: ', PORT);
    });
  } catch (error) {
    console.error('Failed to start server: ', error);
    process.exit(1);
  }
};

startServer();
