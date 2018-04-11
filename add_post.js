module.exports = function(app) {
    app.post('/add', (req, res) => {
        console.log(req.body);
        res.end('User added');
    });
}