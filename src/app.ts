/*
    Importing libs
*/
import cron from "node-cron";

import {
    Telegram,
    Telegraf
} from "telegraf";

import { CheckInternet } from "./utils/modules/utils.module"

import "dotenv/config";

import Bot from "./utils/bot";

/* DOT Env file */

const telegramToken = process.env.TELEGRAM_TOKEN;
const telegram_channel = process.env.TELEGRAM_CHANNEL;
const check_interval = process.env.CHECK_INTERVAL;

/* INITIATOR */
// const telegraf = new Telegraf(telegramToken as string);
const telegram = new Telegram(telegramToken as string);

(async function() {
    cron.schedule(`*/${check_interval} * *`, async function() {
        try {
            await telegram.sendMessage(
                telegram_channel as string,
                `=============\nSTART\n=============`,
                {
                    parse_mode: "HTML"
                }
            );
            const posts = await Bot();
            await telegram.sendMessage(
                telegram_channel as string,
                `=============\nTODAYS POSTS : <code>${posts.length}</code>\nDATE : ${new Date()}\n=============`,
                {
                    parse_mode: "HTML"
                }
            );
            if (posts.length !== 0) {
                let i = 0;
                const interval = setInterval(async () => {
                    await telegram.sendMessage(
                        telegram_channel as string,
                        `POST_ID : <code>"${posts[i].id}"</code>\n\n<b>${posts[i].title}</b>\n\n"${posts[i].description}"\n\n#${posts[i].tags}\n\n${posts[i].url}`,
                        {
                            parse_mode: "HTML"
                        }
                    );
                    i++;
                }, 5000);
                setTimeout(() => clearInterval(interval), posts.length * 5000 + 1000);
                return;
            } else {
                return;
            };
        } catch(err) {
            if (err) {
                const checkInternet = await CheckInternet();
                if (checkInternet === true) {
                    console.log("ERROR OCCURED");
                    return;
                } else {
                    console.log("CHECK YOUR INTERNET");
                    process.exit(1);
                };
            };
        };
    });
})();