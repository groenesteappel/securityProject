const express = require('express');
const router = express.Router();
const { addFeedUrl, removeFeedUrl, getFeedUrls, aggregateAndSortFeeds, toggleFeedState, getSavedSearches } = require('../services/feedService');



router.get('/feed', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL query parameter is required' });
    }

    try {
        const feed = await fetchRSSFeed(url);
        res.json(feed);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch RSS feed as" });
    }
});

// Route to add a new feed URL to the subscription list
router.post('/addUrl', async (req, res) => {
    const url = req.body.url;
    const name = req.body.name;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        await addFeedUrl(name, url);
        res.status(201).json({ message: 'Feed URL added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding feed URL' });
    }
});

//Enable/disable url
router.post('/toggleFeedState', async (req, res) => {
    const { url, enabled } = req.body;
    if (!url) {
        return res.status(400).send("URL is required");
    }
    try {
        await toggleFeedState(url, enabled);
        res.send({ message: 'Feed state updated successfully.' });
    } catch (error) {
        console.error('Failed to toggle feed state:', error);
        res.status(500).send('Error updating feed state.');
    }
});

// Route to remove a feed URL from the subscription list
router.delete('/removeUrl', async (req, res) => {
    const url = req.body.url;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        await removeFeedUrl(url);
        res.json({ message: 'Feed URL removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing feed URL' });
    }
});

// Route to list all subscribed feed URLs
router.get('/listUrls', async (req, res) => {
    try {
        const feeds = await getFeedUrls();
        res.json(feeds);
    } catch (error) {
        res.status(500).json({ error: 'Error listing feed URLs' });
    }
});
router.get('/fetchAllFeeds', async (req, res) => {
    try {
        const aggregatedFeeds = await aggregateAndSortFeeds();
        res.json(aggregatedFeeds);
    } catch (error) {
        res.status(500).send('Failed to aggregate feeds');
    }
});


//savedSearches
router.get('/savedsearches', async (req, res) => {

    try {
        const savedSearches = await getSavedSearches();
        res.json(savedSearches);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch saved searches" });
    }
});

// Route to add a saved search
router.post('/savedSearches', async (req, res) => {
    const { search_query, rss_feed_url } = req.body;

    if (!search_query || !rss_feed_url) {
        return res.status(400).send("Search query and RSS feed URL are required");
    }

    try {
        await addSavedSearch(search_query, rss_feed_url);
        res.status(201).json({ message: 'Saved search added successfully.' });
    } catch (error) {
        console.error('Failed to add saved search:', error);
        res.status(500).send('Error adding saved search.');
    }
});

// Route to remove a saved search
router.delete('/savedSearches', async (req, res) => {
    const { search_query } = req.body;

    if (!search_query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        await removeSavedSearch(search_query);
        res.json({ message: 'Saved search removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing saved search' });
    }
});


module.exports = router;
