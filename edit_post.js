const dataManager = require('./data_manager');

module.exports = function(app) {
    app.post('/edit/:user_id', (req, res) => {
        const updatedUser = dataManager.generateUser(req.body.name, req.body.email, req.body.age);
        dataManager.replaceUser(req.params.user_id, updatedUser)
        .then(() => {
            console.log('inside the .then');
            res.render('message', {message: 'User edited'})
        })
        .catch(err => {
            console.log(err);
            res.render('message', {message: err.message !== undefined ? err.message : err})
        });
    });
}