// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.CHAT_ID;

app.post('/feedback', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: `📬 New Feedback:\n\n${message}`,
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message to Telegram' });
    }
});

app.get('/', (req, res) => res.send('Feedback bot is running!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));