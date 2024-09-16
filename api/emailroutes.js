const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.hassantour.co.tz', // Use 'host' instead of 'service'
  port: 587, // Replace with the correct port if necessary
  secure: false, // Set to true if using SSL (port 465), false for STARTTLS (port 587)
  auth: {
    user: 'booking@hassantour.co.tz', // Replace with your email
    pass: 'DA0zjT6:T{e&'   // Replace with your email password or an App password
  },
  tls: {
    rejectUnauthorized: false // This is useful for development; consider removing for production
  }
});

// Function to send email
const sendEmail = (bookingDetails) => {
  const mailOptions = {
    from: 'booking@hassantour.co.tz',
    to: 'ismailmakamel12@gmail.com', // Replace with the recipient email
    subject: 'New Booking Request',
    text: `
      Full Name: ${bookingDetails.fullName}
      Place: ${bookingDetails.place}
      Phone Number: ${bookingDetails.phoneNumber}
      Email: ${bookingDetails.email}
      Booking Date: ${bookingDetails.bookingDate}
      Number of People: ${bookingDetails.numberOfPeople}
      Special Requests: ${bookingDetails.specialRequests}
    `
  };

  return transporter.sendMail(mailOptions);
};

// POST endpoint to receive booking details and send an email
router.post('/', (req, res) => {
  const bookingDetails = req.body;

  sendEmail(bookingDetails)
    .then(() => {
      res.status(200).send('Booking details sent successfully');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    });
});

module.exports = router;
