const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'smtp.hassantour.co.tz', 
  port: 465, // Replace with the correct port
    secure: true,// You can use other email services
  auth: {
    
    user: 'booking@hassantour.co.tz', // Replace with your email
    pass: 'l=P,(1+)s{9@'   // Replace with your email password or an App password
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
      console.error('Error sending email', error);
      res.status(500).send('Error sending email');
    });
});

module.exports = router;
