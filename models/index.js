const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    sortId: {
        type: String,
        required: true, // corrected from 'require' to 'required'
        unique: true
    },
    url: {
        type: String,
        required: true,
    },
    timeStamp: [{
        time: {
            type: Date,
            default: Date.now // Setting default value as current timestamp
        }
    }]
});

const URL = mongoose.model('URL', urlSchema); // Naming the model and using mongoose.model

module.exports = URL; // Exporting the URL model
