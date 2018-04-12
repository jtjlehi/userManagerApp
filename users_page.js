const DataManager = require('./data_manager');

module.exports = function(app) {
    app.get('/users', (req, res) => {
        res.redirect('/')
    });
    app.get('/', (req, res) => {
        DataManager.parse((users) => {
            res.render('users', {users: users});
        });
    });
}