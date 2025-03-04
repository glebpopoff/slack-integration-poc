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

// Add endpoint to search users
app.get('/search-users', async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const result = await slack.users.list();
        const users = result.members
            .filter(user => !user.is_bot && !user.deleted && 
                (user.real_name?.toLowerCase().includes(query.toLowerCase()) || 
                 user.name?.toLowerCase().includes(query.toLowerCase())))
            .map(user => ({
                id: user.id,
                name: user.real_name || user.name,
                username: user.name
            }));

        res.json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ message: 'Failed to search users' });
    }
});

app.post('/send-message', async (req, res) => {
    try {
        const { messageType, recipientId, message, mentions } = req.body;

        if (!recipientId || !message) {
            return res.status(400).json({ message: 'Recipient and message are required' });
        }

        let channel = recipientId;
        
        // If it's a channel and doesn't start with #, add it
        if (messageType === 'channel' && !recipientId.startsWith('#')) {
            channel = `#${recipientId}`;
        }

        // Format message with mentions
        let formattedMessage = message;
        if (mentions && mentions.length > 0) {
            mentions.forEach(mention => {
                const regex = new RegExp(`@${mention.username}`, 'g');
                formattedMessage = formattedMessage.replace(regex, `<@${mention.id}>`);
            });
        }

        // Send message using Slack API
        const result = await slack.chat.postMessage({
            channel: channel,
            text: formattedMessage,
        });

        res.json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage = error.data?.error || 'Failed to send message';
        res.status(500).json({ message: `Error: ${errorMessage}` });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
