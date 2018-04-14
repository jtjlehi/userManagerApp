const dataManager = require('./data_manager');

module.exports = function(app) {
    app.post('/edit/:user_id', (req, res) => {
        const updatedUser = dataManager.generateUser(req.body.name, req.body.email, req.body.age);
        res.end('edit user clicked');
    });
}