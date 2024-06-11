const axios = require("axios");
const {
    XMLBuilder,
    XMLParser,
    XMLValidator
} = require("fast-xml-parser");

async function MediumCrawller() {
    const request = await axios.get("https://medium.com/feed/tag/nextjs");
    const parser = new XMLParser();
    const jobj = parser.parse(request.data);
    return jobj.rss.channel.item;
};

async function HnCrawller() {
    const data = [];
    let range = 10000000;
    let maxRange = range + 10;
    while (range < maxRange) {
        let request = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${range}.json?print=pretty`);
        if (request.data.type !== "story") {
            return;
        } else {
            data.push({
                id: request.data.id,
                title: request.data.title,
                url: request.data.url
            });
        };
        range++;
    };
    console.log(data);
};

HnCrawller();

module.exports = {
    HnCrawller,
    MediumCrawller
};