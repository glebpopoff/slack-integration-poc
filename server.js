require('dotenv').config();
const express = require('express');
const { WebClient } = require('@slack/web-api');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Slack Web Client
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

app.use(express.json());
app.use(express.static('public'));

app.post('/send-dm', async (req, res) => {
    try {
        const { userId, message } = req.body;

        if (!userId || !message) {
            return res.status(400).json({ message: 'User ID and message are required' });
        }

        // Send DM using Slack API
        const result = await slack.chat.postMessage({
            channel: userId,
            text: message,
        });

        res.json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
