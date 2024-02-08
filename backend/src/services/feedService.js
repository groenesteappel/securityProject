const Parser = require('rss-parser');
const parser = new Parser();

const fetchRSSFeed = async (url) => {
    try {
        const feed = await parser.parseURL(url);
        return feed;
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        throw error; // Propagate error
    }
};

module.exports = {
    fetchRSSFeed,
};
