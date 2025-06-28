const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
connectDB();

dotenv.config();
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




 //Correctly importing routes
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes.js');

// Using them with proper base paths
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);

//const models = require('./models/User.js');
