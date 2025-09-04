import nodemailer from 'nodemailer';

const EMAIL = process.env.NODEMAILER_EMAIL;
const PASS = process.env.NODEMAILER_PASS;

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: PASS,
  },
  // host: 'smtp.gmail.com', // Ensure this is correct
  // port: 587,
  secure: false, // Use TLS
  tls: {
    rejectUnauthorized: false, // Prevent SSL certificate issues
  },
});

export const mailOptions = {
  from: EMAIL,
  to: EMAIL,
};
