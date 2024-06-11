const { MediumCrawller } = require("./modules/crawller.module");
const cheerio = require('cheerio');

async function Bot() {
    const MEDIUM = await CrawllerBot();
    const POSTS = [];
    let i = 0;
    //Fetching medium posts
    while (i < MEDIUM.length) {
        //if not In the db add to db and add to returning array
        if (true) {
            POSTS.push({
                id: MEDIUM[i].guid.slice(21),
                title: MEDIUM[i].title,
                description: cheerio.load(MEDIUM[i].description).text(),
                link: MEDIUM[i].guid
            });
        };
        i++;
    };
    return POSTS;
};

module.exports = {
    Bot
};