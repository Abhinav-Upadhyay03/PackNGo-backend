import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/index.js';
import signup from './routes/signup.js'; // Use ES module import
import login from './routes/login.js'
import vehicles from './routes/vehicles.js'
import driver from './routes/driver.js'
import autocomplete from './routes/autocomplete.js';
import booking from './routes/booking.js';
dotenv.config({
  path: './env',
});

connectDB();
 
const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse incoming JSON requests
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', signup);
app.use('/api', login);
app.use('/api', vehicles);
app.use('/api', driver);
app.use('/api', autocomplete);
app.use('/api', booking);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
