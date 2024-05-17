const express = require('express');
const router = express.Router();
const { addFeedUrl, removeFeedUrl, getFeedUrls, aggregateAndSortFeeds, toggleFeedState, getSavedSearches, addSavedSearch, removeSavedSearch } = require('../services/feedService');


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

// Enable/disable URL
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

// Saved Searches
router.get('/savedsearches', async (req, res) => {
    try {
        const savedSearches = await getSavedSearches();
        res.json(savedSearches);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch saved searches" });
    }
});

router.post('/savedsearches', async (req, res) => {
    const { search } = req.body;
    try {
        console.log('Request received to save search:', search);
        await addSavedSearch(search);
        res.status(200).send({ message: 'Search term added successfully' });
    } catch (error) {
        console.error('Failed to add search term:', error);
        res.status(500).send({ error: 'Failed to add search term' });
    }
});

router.delete('/savedsearches', async (req, res) => {
    const { search } = req.body;
    console.log("asdasd " + search);
    if (!search) {
        return res.status(400).json({ error: 'Search query is required as' });
    }

    try {
        await removeSavedSearch(search);
        res.json({ message: 'Saved search removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing saved search' });
    }
});

module.exports = router;