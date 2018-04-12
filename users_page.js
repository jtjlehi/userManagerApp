module.exports = function(app) {
    app.get('/users', (req, res) => {
        res.redirect('/')
    });
    app.get('/', (req, res) => {
        res.render('users');
    });
}