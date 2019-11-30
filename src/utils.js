import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
    const options = {
        service: "naver",
        auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
        }
    }
    const client = nodemailer.createTransport(options);
    return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
    const email = {
        from: process.env.SENDGRID_USERNAME,
        to: adress,
        subject: "🔒Login Secret for Prismagram🔒",
        html: `Hello! Your login secret is <strong>${secret}<strong><br/>Copy & Paste on the app/website to log in`
    };
    return sendMail(email);
}

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);