// test-db.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.log('❌ MONGO_URI is missing or undefined.');
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Successfully connected to MongoDB Atlas.');
  mongoose.connection.close();
})
.catch((err) => {
  console.error('❌ Failed to connect to MongoDB:', err.message);
});
