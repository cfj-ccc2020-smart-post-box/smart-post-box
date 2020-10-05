import dotenv from 'dotenv';
dotenv.config();

process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'mySecret';
