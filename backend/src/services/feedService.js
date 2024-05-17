const Parser = require('rss-parser');
const parser = new Parser();
const connectDB = require("./db");

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
const SavedSearch = mongoose.model('savedsearches', feedSchemaSavedSearches);

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
                feedTitle: fetchedFeed.title,
                feedName: feed.name,
                feedUrl: feed.url,
            }));
            allFeedItems = allFeedItems.concat(itemsWithMetadata);
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(`Error fetching feed from ${feed.url}: Connection refused`);
            } else {
                console.error(`Error fetching feed from ${feed.url}:`, error);
            }
        }
    }

    allFeedItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    return allFeedItems;
};

async function getSavedSearches() {
    try {
        return await SavedSearch.find();
    } catch (error) {
        console.error("Failed to fetch saved searches:", error);
        throw error;
    }
}

async function addSavedSearch(searchTerm) {
    try {
        console.log('Attempting to add search term:', searchTerm);
        const exists = await SavedSearch.findOne({ search: searchTerm });
        if (!exists) {
            const newSearch = new SavedSearch({ search: searchTerm });
            await newSearch.save();
            console.log('Search term added successfully');
        } else {
            console.log('Search term already exists');
        }
    } catch (error) {
        console.error("Error adding new search term:", error);
        throw error;
    }
}
async function removeSavedSearch(searchTerm) {
    try {
        await SavedSearch.deleteOne({ search: searchTerm });
        console.log('Saved search removed successfully');
    } catch (error) {
        console.error("Error removing saved search:", error);
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
    addSavedSearch,
    removeSavedSearch,
};
