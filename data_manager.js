const fs = require('fs');

class DataManager {
    parse(cbk) {
        fs.readFile('users-data.txt', {encoding: 'utf8'}, (err, data) => {
            if (err) throw err;
            const users = data.split('\n')
                .filter(userString => userString !== "")
                .map(userString => JSON.parse(userString));
            cbk(users);
        });
    }
}

module.exports = new DataManager();