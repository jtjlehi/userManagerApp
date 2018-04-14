module.exports = function(app) {
    app.post('/edit/:user_id', (req, res) => {
        console.log('user_id: ', req.params.user_id);
        res.end('edit user clicked');
    })
}