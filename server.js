const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
app.use(bodyparser.json());
app.use('/' , routes);









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



