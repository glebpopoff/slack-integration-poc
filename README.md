# Slack DM Sender

A simple web application to send direct messages to Slack users.

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

1. Enter a Slack user ID (you can get this from their profile in Slack)
2. Type your message
3. Click "Send Message"
