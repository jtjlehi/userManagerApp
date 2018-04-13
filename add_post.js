const DataManager = require('./data_manager');

module.exports = function(app) {
    app.post('/add', (req, res) => {
        const user = DataManager.generateUser(req.body.name, req.body.string, req.body.age);
        DataManager.addUser(user)
        .then((err) => {
            if (err) res.end(err.message)
            res.end('User added')
        })
    });
}