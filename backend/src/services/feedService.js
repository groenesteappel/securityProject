const fs = require('fs').promises;
const path = require('path');
const Parser = require('rss-parser');
const parser = new Parser();
const FEEDS_FILE = path.join(__dirname, 'feeds.json');

async function getFeedUrls() {
    console.log(`Looking for feeds.json at: ${FEEDS_FILE}`);
    try {
        const data = await fs.readFile(FEEDS_FILE);
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error("The feeds.json file does not exist, creating with default empty array.");
            await saveFeedUrls([]);
            return [];
        } else {
            throw error;
        }
    }
}

async function saveFeedUrls(feeds) {
    await fs.writeFile(FEEDS_FILE, JSON.stringify(feeds, null, 2));
}

async function addFeedUrl(name, url) {
    const feeds = await getFeedUrls();
    const index = feeds.findIndex(f => f.url === url);
    if (index === -1) {
        feeds.push({ name, url, enabled: true }); // Include the feed name here
        await saveFeedUrls(feeds);
    }
}

async function removeFeedUrl(url) {
    let feeds = await getFeedUrls();
    feeds = feeds.filter(feed => feed.url !== url);
    await saveFeedUrls(feeds);
}

async function toggleFeedState(url, enabled) {
    let feeds = await getFeedUrls();
    const feed = feeds.find(feed => feed.url === url);
    if (feed) {
        feed.enabled = enabled;
        await saveFeedUrls(feeds);
    }
}

const aggregateAndSortFeeds = async () => {
    const feeds = await getFeedUrls();
    let allFeedItems = [];

    for (const feed of feeds.filter(feed => feed.enabled)) {
        try {
            const fetchedFeed = await parser.parseURL(feed.url);
            const itemsWithMetadata = fetchedFeed.items.map(item => ({
                ...item,
                feedTitle: fetchedFeed.title, // This is the title from the feed itself
                feedName: feed.name, // Include the name property for filtering
                feedUrl: feed.url, // Include the url property for filtering
            }));
            allFeedItems = allFeedItems.concat(itemsWithMetadata);
        } catch (error) {
            console.error(`Error fetching feed from ${feed.url}:`, error);
        }
    }

    // Sort by publication date
    allFeedItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    return allFeedItems;
};

module.exports = {
    addFeedUrl,
    removeFeedUrl,
    getFeedUrls,
    toggleFeedState,
    aggregateAndSortFeeds,
};
