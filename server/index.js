require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const cors = require('cors');

// Connect DB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes.js');
const chatbotRoutes = require('./routes/chatbotRoutes.js');

app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Use dynamic PORT (Render requirement)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
