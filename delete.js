const dataManager = require('./data_manager');

module.exports = function(app) {
    app.get('/delete/:user_id', (req, res) => {
        dataManager.replaceUser(req.params.user_id, '');
        res.end('deleted user');
    })
}