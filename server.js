'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();

var urlShortener = require('./handlers/urlShortener');

// enable cors for handling cross-origin
app.use(cors());

// enable body-parser to parse the url data
app.use( bodyParser.urlencoded({extended: false}))


// setup front end routing
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/shorturl/new', urlShortener.newUrl);
  
app.get('/api/shorturl/:shortUrl', urlShortener.shortUrl);



app.listen(process.env.PORT || 3000, () => {
  console.log('serving ...');
});