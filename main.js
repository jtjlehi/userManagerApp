// outside sources
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
// my imports
const edit = require('./edit');
const add = require('./add_user');
// define app
const app = express();
// use basic middleware on app.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// enable and use pug files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

edit(app);
add(app);

app.listen(3000);

console.log('listening on port 3000');