export const startMessage = `☣️ *W E L C O M E   T O   T H E   R E A C T I O N   R E V O L U T I O N* ☣️

🔥 *Hey UserName!* Ready to weaponize your chats with emoji artillery? 💥

⚡ *COMBAT MODES* ⚡
〰〰〰〰〰〰〰〰
🔹 *DM ASSAULT*: Send any message to me and get hit with random emoji shrapnel! 
🔹 *GROUP SIEGE*: Add me to groups/channels and watch me rain emoji grenades on every message!

🛠 *ARMORY*: Type /reactions to see my full emoji arsenal
💻 *DEPLOY YOUR OWN*: [GitHub Repo](https://github.com/Malith-Rukshan/Auto-Reaction-Bot) | No server needed!

☠️ *WARNING:* Excessive awesomeness may occur. Use with caution!

💸 Keep the servers smoking: /donate`

export const donateMessage = `💉 *FUEL THE MACHINE* 💉
Help us maintain our emoji warfare capabilities! Every contribution powers:

☑️ 24/7 server uptime
☑️ New lethal emoji weapons
☑️ Global domination plans

⚰️ Don't let the bot die - your support keeps the reaction apocalypse alive!`

export const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>☣️ EMOJI WARFARE BOT</title>
    <meta name="description" content="Deploy emoji annihilation across Telegram chats. Open-source destruction engine by Malith-Rukshan.">
    <style>
        :root {
            --neon: #00ff9d;
            --blood: #ff4655;
        }
        body {
            background: radial-gradient(circle, #0a0a0a 0%, #000 100%);
            color: #fff;
            font-family: 'Courier New', monospace;
            text-align: center;
            margin: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow-x: hidden;
        }
        .glitch-title {
            font-size: 2.5rem;
            text-shadow: 3px 3px 0 var(--blood),
                         -1px -1px 0 var(--neon);
            animation: glitch 2s infinite;
            margin: 2rem 0;
        }
        .cyber-border {
            border: 3px solid var(--neon);
            padding: 2rem;
            margin: 2rem;
            position: relative;
            box-shadow: 0 0 15px var(--neon);
        }
        .cyber-button {
            background: #000;
            color: var(--neon);
            padding: 1rem 2rem;
            border: 2px solid var(--neon);
            margin: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .cyber-button:hover {
            background: var(--neon);
            color: #000;
            box-shadow: 0 0 25px var(--neon);
        }
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
    </style>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
</head>
<body>
    <div class="cyber-border">
        <h1 class="glitch-title">☣️ EMOJI WARFARE BOT ☣️</h1>
        <img src="https://telegra.ph/file/cb59967120c6bda64580b.jpg" 
             style="width:300px; border: 2px solid var(--blood); margin: 1rem;">
        
        <button class="cyber-button" 
                onclick="window.open('https://github.com/Malith-Rukshan/Auto-Reaction-Bot','_blank')">
            DEPLOY YOUR OWN
        </button>

        <div style="margin: 2rem;">
            <a class="github-button" 
               href="https://github.com/Malith-Rukshan/Auto-Reaction-Bot" 
               data-color-scheme="dark" 
               data-size="large" 
               data-show-count="true" 
               aria-label="Star Malith-Rukshan/Auto-Reaction-Bot on GitHub">Star</a>
            
            <a class="github-button" 
               href="https://github.com/Malith-Rukshan/Auto-Reaction-Bot/fork" 
               data-color-scheme="dark" 
               data-size="large" 
               data-show-count="true" 
               aria-label="Fork Malith-Rukshan/Auto-Reaction-Bot on GitHub">Fork</a>
        </div>
        
        <div style="border-top: 1px solid var(--blood); padding: 1rem; margin-top: 2rem;">
            <p style="color: var(--neon);">☠️ WARNING: May cause uncontrollable chat engagement</p>
        </div>
    </div>
</body>
</html>
`;
