const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');
const ejs = require('ejs');
const URL = require('./models');
require('dotenv').config();

const app = express();
app.use(bodyparser.json());
app.use('/api' , routes);
app.set('views', './views');

// Set EJS as the templating engine
app.set('view engine', 'ejs');





app.get('/', async (req, res) => {
    const data =  await URL.find();
    res.render("home", {data});
})


// server starting.
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server is responding at ' + port);
});


// connection to database.
(
    async() => {
    try{
        const connection = mongoose.connect('mongodb://127.0.0.1:27017/')
        if(connection){
            console.log('Successfully connected to database.')
        }
    }catch(error){
        console.log(error.message);
    }
}
)()



