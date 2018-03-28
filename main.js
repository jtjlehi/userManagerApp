const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('edit', {
        users: [
            {
                name: {
                    name: 'name',
                    type: 'text',
                    value: 'Jared'
                },
                password: {
                    name: 'password',
                    type: 'text',
                    value: ''
                }
            }
        ]
    });
});

app.listen(3000);

console.log('listening on port 3000');