// 1) Modules
import dotenv from 'dotenv';
import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// dotenv
dotenv.config({
    silent: process.env.NODE_ENV === 'production',
    path: '.env'
});



// 2) Express settings
const app = express();
app.set('trust proxy', 1);



// 3) Middlewares
app.use(express.static('public'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cors());
// Dev
if (process.env.NODE_ENV === 'development')
app.use(morgan('dev'));
// Main middleware
app.use(async (req, res, next) => {
    // console.log('Hello from middleware.');

    req.time = Date.now();
    next();
});



// 4) Routes
// Home
app.get('/', (req, res) => {
    res.send('Welcome! <a href="/json">JSON</a>')
});
// json
app.get('/json', (req, res) => {
    res.json({
        test: 'ok'
    })
});



// 5) Start server
const port = process.env.PORT;
const server = app.listen(port, () => console.log(`App running on port ${port}...`));