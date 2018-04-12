const fs = require('fs');

module.exports = function(app) {
    app.post('/add', (req, res) => {
        const body = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        };
        const newUser = JSON.stringify(body);
        fs.appendFile('./users-data.txt', `${newUser}\n`, (err) => {
            if (err) throw err;
        });
        res.end('User added');
    });
}