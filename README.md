# Slack Message Sender

A simple web application to send direct messages and channel messages in Slack.

## Setup

1. Create a Slack App in your workspace:
   - Go to https://api.slack.com/apps
   - Click "Create New App"
   - Choose "From scratch"
   - Select your workspace

2. Configure your Slack App:
   - Under "OAuth & Permissions", add these bot token scopes:
     - `chat:write`
     - `im:write`
     - `channels:read`
     - `groups:read`
   - Install the app to your workspace
   - Copy the "Bot User OAuth Token" (starts with `xoxb-`)

3. Set up the application:
   ```bash
   # Install dependencies
   npm install

   # Update .env file with your Slack bot token
   # Replace 'your_slack_bot_token_here' with the actual token
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open http://localhost:3000 in your browser

## Usage

1. Select message type (Direct Message or Channel Message)
2. For Direct Messages:
   - Enter a Slack user ID (get this from their profile in Slack)
3. For Channel Messages:
   - Enter the channel name (without the #)
4. Type your message
5. Click "Send Message"

Note: The bot must be invited to any private channels before it can post messages there.
