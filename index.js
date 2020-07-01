require('dotenv').config();
const path = require('path');
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
app.use('/api/calendar', require('./routes/api/googleCalendar'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
