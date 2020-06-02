require('dotenv').config();

const express = require('express');
const connectDB = require('./db');

const app = express();

//connect to database
connectDB();

// allows use to parse json
app.use(express.json());

//Define Routes
app.use('/api/users', require('./routes/api/user'));

app.get('/', (req, res) => res.send('api running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
