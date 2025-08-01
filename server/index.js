require('dotenv').config();
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

// Correctly importing routes
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes.js');
const chatbotRoutes = require('./routes/chatbotRoutes.js'); // <-- Added chatbot route import

// Using them with proper base paths
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/chatbot', chatbotRoutes); // <-- Added chatbot route usage

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//const models = require('./models/User.js');
