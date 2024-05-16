const Parser = require('rss-parser');
const parser = new Parser();
const connectDB = require("./db")

connectDB();

const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    enabled: { type: Boolean, default: true }
});
const feedSchemaSavedSearches = new mongoose.Schema({
    search: { type: String, required: true },
});

const Feed = mongoose.model('Feed', feedSchema);
const savedSearchesMongoose = mongoose.model('savedsearches', feedSchemaSavedSearches);


async function getFeedUrls() {
    try {
        return await Feed.find();
    } catch (error) {
        console.error("Failed to fetch feeds:", error);
        throw error;
    }
}

async function addFeedUrl(name, url) {
    try {
        const exists = await Feed.findOne({ url: url });
        if (!exists) {
            const newFeed = new Feed({ name, url, enabled: true });
            await newFeed.save();
            console.log('Feed added successfully');
        }
    } catch (error) {
        console.error("Error adding new feed:", error);
        throw error;
    }
}


async function removeFeedUrl(url) {
    try {
        await Feed.deleteOne({ url: url });
        console.log('Feed removed successfully');
    } catch (error) {
        console.error("Failed to remove feed:", error);
        throw error;
    }
}


async function toggleFeedState(url, enabled) {
    try {
        await Feed.updateOne({ url: url }, { $set: { enabled: enabled } });
        console.log('Feed state toggled successfully');
    } catch (error) {
        console.error("Failed to toggle feed state:", error);
        throw error;
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


async function getSavedSearches() {
    try {
        return await savedSearchesMongoose.find();
    } catch (error) {
        console.error("Failed to fetch feeds:", error);
        throw error;
    }
}

module.exports = {
    addFeedUrl,
    removeFeedUrl,
    getFeedUrls,
    toggleFeedState,
    aggregateAndSortFeeds,
    getSavedSearches,
};
