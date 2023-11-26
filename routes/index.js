const express = require('express');
const router = express.Router();
const { handleSortURL, handleGetSortURL, handleAnalytic } = require('../controller/sortcontroller');

router.post('/short', handleSortURL);
router.get('/:sortid', handleGetSortURL);
router.get('/analytic/:sortid', handleAnalytic);


module.exports = router;