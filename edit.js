module.exports = function(app) {
    app.get('/edit', (req, res) => {
        res.render('edit', {
            users: [
                {
                    name: {
                        name: 'name',
                        type: 'text',
                        value: 'Jared'
                    },
                    password: {
                        name: 'password',
                        type: 'text',
                        value: ''
                    }
                }
            ]
        });
    });
}
