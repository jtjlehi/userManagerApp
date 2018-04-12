const parseUserData = require('./parse_user_data');

module.exports = function(app) {
    app.get('/users', (req, res) => {
        res.redirect('/')
    });
    app.get('/', (req, res) => {
        parseUserData((users) => {
            res.render('users', {users: users});
        });
    });
}