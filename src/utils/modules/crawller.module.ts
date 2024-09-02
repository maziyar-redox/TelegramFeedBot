/*
    importing libs
*/
import axios from "axios";

import { XMLParser } from "fast-xml-parser";

import * as cheerio from "cheerio";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* 
    DOT ENV CONFIG
*/
import "dotenv/config";

import { FeedType } from "../../types";

import CharFilter from "./char-filter.module";

/*
    Creating main function for crawlling medium
*/
export async function MediumCrawller() {
    const Slugs = [
        "feed/tag/"
    ];
    const Tags = [
        "conversational-ai",
        "deep-learning",
        "large-language-models",
        "machine-learning",
        "nlp",
        "coding",
        "software-engineering",
        "web-development",
        "java",
        "javascript",
        "nodejs",
        "python",
        "typescript",
        "go",
        "sql",
        "linux",
        "data-engineering",
        "database-design",
        "raspberry-pi",
        "arduino",
        "robotics",
        "cybersecurity",
        "data-security",
        "encryption",
        "infosec",
        "algorithms",
        "math",
        "problem-solving",
    ];
    const Posts: FeedType[] = [];
    let tagLength = 0;
    while (tagLength < Tags.length) {
        const request = await axios.get(`${process.env.MEDIUM_URL as string}${Slugs[0]}${Tags[tagLength]}`, {
            headers: {
                "User-Agent": `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36`
            },
        });
        const parser = new XMLParser();
        const data = parser.parse(request.data);
        const items = data.rss.channel.item;
        if (items.length === 0) {
            tagLength++;
            return;
        };
        let dataLength = 0;
        while (dataLength < items.length) {
            const guid = items[dataLength].guid.split("com/p/");
            const isDuplicate = await prisma.medium.findUnique({
                where: {
                    post_id: guid[1],
                },
            });
            if (isDuplicate) {
                dataLength++;
            } else {
                await prisma.medium.create({
                    data: {
                        post_id: guid[1],
                        createdAt: new Date()
                    },
                });
                const $ = cheerio.load(items[dataLength].description);
                Posts.push({
                    id: guid[1],
                    title: items[dataLength].title,
                    description: $(".medium-feed-snippet").text(),
                    url: items[dataLength].link,
                    tags: Tags[tagLength],
                });
                dataLength++;
            };
        };
        tagLength++;
    };
    return Posts;
};

/*
    Creating main function for crawlling dev.to
*/
export async function DevToCrawller() {
    const Slugs = [
        "articles/latest",
        "articles"
    ];
    const Tags = [
        "webdev",
        "javascript",
        "nextjs",
        "react",
        "webdev",
        "python",
        "news",
        "ai",
        "programming",
        "machinelearning",
        "security",
        "typescript",
        "computerscience",
        "database",
    ];
    const Posts: FeedType[] = [];
    let tagLength = 0;
    while (tagLength < Tags.length) {
        const request = await axios.get(`${process.env.DEVTO_URL as string}${Slugs[1]}?per_page=4&tag=${Tags[tagLength]}&top=7`, {
            headers: {
                "api-key": process.env.DEVTO_KEY,
                "Content-Type": "application/json",
            },
        });
        if (request.data.length === 0) {
            tagLength++;
            return;
        };
        let dataLength = 0;
        while (dataLength < request.data.length) {
            const isDuplicate = await prisma.devTo.findUnique({
                where: {
                    post_id: request.data[dataLength].id,
                },
            });
            if (isDuplicate) {
                dataLength++;
            } else {
                await prisma.devTo.create({
                    data: {
                        post_id: request.data[dataLength].id,
                        createdAt: new Date()
                    },
                });
                Posts.push({
                    id: request.data[dataLength].id,
                    title: request.data[dataLength].title,
                    description: request.data[dataLength].description,
                    url: request.data[dataLength].url,
                    tags: Tags[tagLength],
                });
                dataLength++;
            };
        };
        tagLength++;
    };
    return Posts;
};

/*
    Creating main function for crawlling Science
*/
export async function ScienceCrawller() {
    const Slugs = [
        "action/showFeed?type=etoc&feed=rss&jc="
    ];
    const Tags = [
        "scirobotics",
        "sciadv",
        "science"
    ];
    const Posts: FeedType[] = [];
    let tagLength = 0;
    while (tagLength < Tags.length) {
        const request = await axios.get(`${process.env.SCIENCE_URL as string}${Slugs[0]}${Tags[tagLength]}`, {
            headers: {
                "User-Agent": `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36`,
            },
        });
        const parser = new XMLParser();
        const data = parser.parse(request.data);
        const items = data["rdf:RDF"].item;
        if (items.length === 0) {
            tagLength++;
            return;
        };
        let dataLength = 0;
        while (dataLength < items.length) {
            const guid = items[dataLength]["prism:doi"] as string;
            const isDuplicate = await prisma.science.findUnique({
                where: {
                    post_id: guid,
                },
            });
            if (isDuplicate) {
                dataLength++;
            } else {
                const charRemoval = CharFilter(items[dataLength].description, "<br/>");
                await prisma.science.create({
                    data: {
                        post_id: guid,
                        createdAt: new Date()
                    },
                });
                Posts.push({
                    id: guid,
                    title: items[dataLength].title,
                    description: charRemoval,
                    url: items[dataLength].link,
                    tags: Tags[tagLength],
                });
                dataLength++;
            };
        };
        tagLength++;
    };
    return Posts;
};

/*
    Creating main function for crawlling Science Daily
*/
export async function ScienceDailyCrawller() {
    const Slugs = [
        "rss/"
    ];
    const Tags = [
        "computers_math/robotics.xml",
        "computers_math/hacking.xml",
        "matter_energy/quantum_computing.xml",
        "matter_energy/quantum_physics.xml",
        "matter_energy/physics.xml",
        "computers_math.xml"
    ];
    const Posts: FeedType[] = [];
    let tagLength = 0;
    while (tagLength < Tags.length) {
        const request = await axios.get(`${process.env.SCIENCEDAILY_URL as string}${Slugs[0]}${Tags[tagLength]}`, {
            headers: {
                "User-Agent": `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36`,
            },
        });
        const parser = new XMLParser();
        const data = parser.parse(request.data);
        const items = data.rss.channel.item;
        if (items.length === 0) {
            tagLength++;
            return;
        };
        let dataLength = 0;
        while (dataLength < items.length) {
            const isDuplicate = await prisma.scienceDaily.findUnique({
                where: {
                    post_id: items[dataLength].guid,
                },
            });
            if (isDuplicate) {
                dataLength++;
            } else {
                await prisma.scienceDaily.create({
                    data: {
                        post_id: items[dataLength].guid,
                        createdAt: new Date()
                    },
                });
                const $ = cheerio.load(items[dataLength].description);
                Posts.push({
                    id: items[dataLength].guid,
                    title: items[dataLength].title,
                    description: items[dataLength].description,
                    url: items[dataLength].link,
                    tags: Tags[tagLength],
                });
                dataLength++;
            };
        };
        tagLength++;
    };
    return Posts;
};