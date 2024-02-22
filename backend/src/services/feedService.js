const Parser = require('rss-parser');
const parser = new Parser();

const fs = require('fs').promises;
const path = require('path');
const FEEDS_FILE = path.join(__dirname, 'feeds.json');

const fetchRSSFeed = async (url) => {
    try {
        const feed = await parser.parseURL(url);
        return feed;
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        throw error; // Propagate error
    }
};

async function addFeedUrl(url) {
    const feeds = await getFeedUrls();
    if (!feeds.includes(url)) {
        feeds.push(url);
        await saveFeedUrls(feeds);
    }
}

async function removeFeedUrl(url) {
    let feeds = await getFeedUrls();
    feeds = feeds.filter(feedUrl => feedUrl !== url);
    await saveFeedUrls(feeds);
}

async function getFeedUrls() {
    try {
        const data = await fs.readFile(FEEDS_FILE);
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await saveFeedUrls([]); // Create file if it does not exist
            return [];
        } else {
            throw error;
        }
    }
}

const aggregateAndSortFeeds = async () => {
    const feedUrls = await getFeedUrls(); // Retrieve all feed URLs
    let allFeedItems = [];

    for (const url of feedUrls) {
        try {
            const feed = await fetchRSSFeed(url); // Fetch each feed
            allFeedItems = allFeedItems.concat(feed.items.map(item => ({
                ...item,
                feedTitle: feed.title, // Optional: include feed title for reference
                feedUrl: url, // Optional: include feed URL for reference
            })));
        } catch (error) {
            console.error(`Error fetching feed from ${url}:`, error);

        }
    }

    // Sort all feed items by publication date, assuming item.pubDate is the date string
    allFeedItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    return allFeedItems;
};
async function saveFeedUrls(feeds) {
    await fs.writeFile(FEEDS_FILE, JSON.stringify(feeds, null, 2));
}

module.exports = {
    fetchRSSFeed,
    addFeedUrl,
    removeFeedUrl,
    getFeedUrls,
    aggregateAndSortFeeds,
};
