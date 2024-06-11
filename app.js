const cron = require("node-cron");
const { Telegram, Telegraf } = require("telegraf");
const { Bot } = require("./utils/bot");

require("dotenv").config();

//Dot Env File

const telegramToken = process.env.TELEGRAM_TOKEN;
const telegram_channel = process.env.TELEGRAM_CHANNEL;
const check_interval = process.env.CHECK_INTERVAL;

/* INITIATOR */
const telegraf = new Telegraf(telegramToken);
const telegram = new Telegram(telegramToken);

(async function() {
    cron.schedule(`*/2 * * * *`, async function() {
        const posts = await Bot();
        let i = 0;
        while (i < posts.length) {
            await telegram.sendMessage(telegram_channel, `<b>${posts[i].title}</b>\n\n<code>POST_ID : "${posts[i].id}"</code>\n\n"${posts[i].description}"\n\n${posts[i].link}`, { parse_mode: "HTML" });
            i++;
        };
    });
})();