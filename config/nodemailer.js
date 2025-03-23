import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port:587,
    auth: {
        user: process.env.EMAIL_SERVICE,
        pass: process.env.EMAIL_PASSWORD,
    }
})

export default transporter;
