const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
require('dotenv').config(); // ✅ REQUIRED to load Railway env vars

const app = express();

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Enable CORS for your frontend domain
app.use(cors({
  origin: ['https://ezytax.netlify.app'],
  credentials: true
}));

app.use(express.json());

// Debug: Log env values
console.log("🚨 MONGO_URI:", process.env.MONGO_URI);
console.log("🚨 EMAIL_USER:", process.env.EMAIL_USER);

// Mongoose config
mongoose.set('strictQuery', true);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/filings', require('./routes/filings'));
app.use('/api/utr', require('./routes/utr'));
app.use('/api/consults', require('./routes/consults'));

app.get('/api/ping', (req, res) => res.send('Pong 🏓'));

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/test-email', (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.body.to,
    subject: 'Test Email from EZYTax',
    text: 'This is a test email sent from the EZYTax backend server.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Email error:', error);
      return res.status(500).json({ error: 'Email sending failed.' });
    }
    console.log('📧 Email sent:', info.response);
    res.status(200).json({ message: 'Test email sent successfully.' });
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
