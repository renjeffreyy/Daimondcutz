require('dotenv').config();

const express = require('express');
const connectDB = require('./db');

const app = express();

connectDB();

app.get('/', (req, res) => res.send('api running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
