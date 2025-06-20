const multer = require('multer');
const Filing = require('../models/Filing');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.any(), async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      pan,
      dob,
      date,
      employmentType,
      incomeSources,
      deductions,
      remarks
    } = req.body;

    const newFiling = new Filing({
      fullName,
      email,
      mobile,
      pan,
      dob,
      date,
      employmentType,
      incomeSources: JSON.parse(incomeSources || '[]'),
      deductions: JSON.parse(deductions || '[]'),
      remarks,
      documents: req.files.map(file => ({
        filename: file.originalname,
        mimetype: file.mimetype,
        data: file.buffer
      }))
    });

    await newFiling.save();

    // Send email
    await sendEmailWithAttachments(email, newFiling);

    res.status(201).json({ message: 'Filing submitted and emailed successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error submitting filing.' });
  }
});

async function sendEmailWithAttachments(toEmail, filing) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or use SMTP config
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'New Tax Filing Submitted',
    text: `Hi ${filing.fullName},\n\nYour filing has been received successfully.\n\nRegards,\nTeam`,
    attachments: filing.documents.map(doc => ({
      filename: doc.filename,
      content: doc.data,
      contentType: doc.mimetype
    }))
  };

  await transporter.sendMail(mailOptions);
}

module.exports = router;
