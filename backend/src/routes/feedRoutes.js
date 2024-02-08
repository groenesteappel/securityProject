const express = require('express');
const router = express.Router();
const { fetchRSSFeed } = require('../services/feedService');

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

module.exports = router;
