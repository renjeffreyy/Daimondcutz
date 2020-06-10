require('dotenv').config();

const express = require('express');
const connectDB = require('./db');

const app = express();

//connect to database
connectDB();

// allows use to parse json
app.use(express.json());

//Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/reviews', require('./routes/api/reviews'));

app.get('/', (req, res) => res.send('api running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
