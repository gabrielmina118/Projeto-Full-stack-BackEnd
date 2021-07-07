import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

export class Transporter {
    public transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        },
        tls: { ciphers: "SSLv3" }
    })
}