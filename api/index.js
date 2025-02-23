/*!
 * © [2024] Malith-Rukshan. All rights reserved.
 * Repository: https://github.com/Malith-Rukshan/Auto-Reaction-Bot
 * Optimized Version: 1.1.0
 */

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import TelegramBotAPI from './TelegramBotAPI.js';
import { htmlContent, startMessage, donateMessage } from './constants.js';
import { splitEmojis, getRandomPositiveReaction, getChatIds } from './helper.js';

// Configuration & Validation
dotenv.config({ path: '.env' });
validateEnvironment();

const app = express();
app.use(bodyParser.json());

// Precompute constants
const BOT_CONFIG = {
    token: process.env.BOT_TOKEN,
    username: process.env.BOT_USERNAME,
    reactions: splitEmojis(process.env.EMOJI_LIST || ''),
    restrictedChats: getChatIds(process.env.RESTRICTED_CHATS || ''),
    randomLevel: Math.min(Math.max(parseInt(process.env.RANDOM_LEVEL || '0', 10), 0), 10)
};

const botApi = new TelegramBotAPI(BOT_CONFIG.token);

// Routes
app.post('/', async (req, res) => {
    try {
        await handleUpdate(req.body);
        res.status(200).send('Ok');
    } catch (error) {
        console.error(`Error processing update: ${error.message}`);
        res.status(200).send('Ok'); // Always respond OK to prevent retries
    }
});

app.get('/', (req, res) => {
    res.send(htmlContent);
});

// Update Handler
async function handleUpdate(data) {
    if (data.pre_checkout_query) {
        return handlePaymentQuery(data.pre_checkout_query);
    }

    const content = data.message || data.channel_post;
    if (!content) return;

    const { chat, message_id, text } = content;
    const isCommand = text?.startsWith('/');

    if (isCommand) {
        await handleCommand(content);
        return;
    }

    if (!BOT_CONFIG.restrictedChats.includes(chat.id)) {
        await processReaction(content);
    }
}

// Command Handlers
async function handleCommand(content) {
    const { chat, text } = content;
    const command = text.split(' ')[0].toLowerCase();

    switch (command) {
        case '/start':
            await handleStartCommand(content);
            break;
        case '/reactions':
            await sendReactionList(chat.id);
            break;
        case '/donate':
            await sendDonationInvoice(chat.id);
            break;
        case '/id': 
            await sendUserDetails(content);
            break;
    }
}

async function handleStartCommand(content) {
    const { chat, from } = content;
    const isPrivate = chat.type === "private";
    const userName = isPrivate ? from.first_name : chat.title;

    await botApi.sendMessage(chat.id, startMessage.replace('UserName', userName), [
        [
            { text: "➕ Add to Channel ➕", url: `https://t.me/${BOT_CONFIG.username}?startchannel=botstart` },
            { text: "➕ Add to Group ➕", url: `https://t.me/${BOT_CONFIG.username}?startgroup=botstart` },
        ],
        [
            { text: "Github Source 📥", url: "https://github.com/Malith-Rukshan/Auto-Reaction-Bot" },
        ],
        [
            { text: "💝 Support Us - Donate 🤝", url: `https://t.me/${BOT_CONFIG.username}?start=donate` }
        ]
    ]);
}

// Reaction Logic
async function processReaction(content) {
    const { chat, message_id } = content;
    const threshold = 1 - (BOT_CONFIG.randomLevel / 10);

    if (["group", "supergroup"].includes(chat.type)) {
        if (Math.random() <= threshold) {
            await sendReaction(chat.id, message_id);
        }
    } else {
        await sendReaction(chat.id, message_id);
    }
}

async function sendReaction(chatId, messageId) {
    const reaction = getRandomPositiveReaction(BOT_CONFIG.reactions);
    await botApi.setMessageReaction(chatId, messageId, reaction);
}

// Payment Handlers
async function handlePaymentQuery(query) {
    await botApi.answerPreCheckoutQuery(query.id, true);
    await botApi.sendMessage(query.from.id, "Thank you for your donation! 💝");
}

async function sendDonationInvoice(chatId) {
    await botApi.sendInvoice(
        chatId,
        "Donate to Auto Reaction Bot ✨",
        donateMessage,
        'PAYLOAD_' + Date.now(),
        process.env.PAYMENT_PROVIDER_TOKEN,
        'donate',
        'USD',
        [{ label: 'Support Tier 1', amount: 100 }] // $1.00
    );
}

// Helper Functions
async function sendReactionList(chatId) {
    const reactionText = BOT_CONFIG.reactions.length > 0 
        ? "✅ Enabled Reactions:\n\n" + BOT_CONFIG.reactions.join(", ")
        : "⚠️ No reactions configured!";
    await botApi.sendMessage(chatId, reactionText);
}

function validateEnvironment() {
    const requiredVars = ['BOT_TOKEN', 'BOT_USERNAME'];
    requiredVars.forEach(varName => {
        if (!process.env[varName]) {
            throw new Error(`Missing required environment variable: ${varName}`);
        }
    });
}

// id info 
async function sendUserDetails(content) {
    const { chat, from, message_id } = content;
    const user = content.message ? content.message.from : content.channel_post.sender_chat;
    
    const userDetails = `
👁️‍🗨️ ʏᴏᴜʀ ᴅᴇᴛᴀɪʟs

○ ɪᴅ : <code>${user.id}</code>
○ ᴅᴄ : <code>${user.dc_id || 'N/A'}</code>
○ ғɪʀsᴛ ɴᴀᴍᴇ : ${user.first_name || '~'}
○ ᴜsᴇʀ ɴᴀᴍᴇ : ${user.username ? '@' + user.username : '~'}
○ ʟɪɴᴋ : ${user.username ? `https://t.me/${user.username}` : 'Not available'}
    `.trim();

    await botApi.sendMessage(
        chat.id,
        userDetails,
        { 
            parse_mode: 'HTML',
            reply_to_message_id: message_id 
        }
    );
}
// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`⚡️ Server running on port ${PORT}`);
    console.log(`🤖 Bot Configuration:`);
    console.log(`- Username: @${BOT_CONFIG.username}`);
    console.log(`- Reactions: ${BOT_CONFIG.reactions.length} emojis loaded`);
    console.log(`- Random Level: ${BOT_CONFIG.randomLevel}/10`);
});
