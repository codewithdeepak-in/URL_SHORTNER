const URL = require('../models/index');
const shortid = require('shortid');

const handleSortURL = async (req, res, next) => {
    try {
        const existingLink = await URL.findOne({ url: req.body.url });
        if (existingLink) {
            res.json({ link: existingLink, message: 'Sort URL already exists for this link' });
        } else {
            const shortID = shortid.generate();
            const newSort = new URL({
                sortId: shortID,
                url: req.body.url,
            });
            await newSort.save();
            res.json({ id: shortID, message: 'Sort ID generated successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const handleGetSortURL = async (req, res, next) => {
    try {
        const sortId = req.params.sortid;
        const findURL = await URL.findOneAndUpdate(
            { sortId },
            { $push: { timeStamp: { time: Date.now() } } }, // Use $push to add a new timestamp object
            { new: true } // To return the updated document
        );

        if (findURL) {
            res.redirect(findURL.url);
        } else {
            res.status(404).json({ message: 'No URL found for the provided sortId' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const handleAnalytic = async (req, res, next) => {
    try {
        const sortid = req.params.sortid;
        const urlDocument = await URL.findOne({ sortId: sortid });
        if (!urlDocument) {
            return res.status(404).json({ message: 'URL not found for the provided sortId' });
        }
        const timestampCount = urlDocument.timeStamp.length;
        res.json({ count: timestampCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server error' });
    }
};

module.exports = {
    handleSortURL, 
    handleGetSortURL,
    handleAnalytic
};
