const dataManager = require('./data_manager');

module.exports = function(app) {
    app.post('/edit/:user_id', (req, res) => {
        const updatedUser = dataManager.generateUser(req.body.name, req.body.email, req.body.age);
        dataManager.replaceUser(req.params.user_id, JSON.stringify(updatedUser))
        .then(res.end('edit user clicked'))
        .catch(err, res.end(err.message !== undefined ? err.message : err));
    });
}