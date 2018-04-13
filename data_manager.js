const fs = require('fs');

class DataManager {
    parse() {
        return new Promise((resolve, reject) => {
            fs.readFile('users-data.txt', {encoding: 'utf8'}, (err, data) => {
                if (err) throw err;
                const users = data.split('\n')
                    .filter(userString => userString !== "")
                    .map(userString => JSON.parse(userString));
                resolve(users);
            });
        })
    }
    addUser(user) {
        return this.parse()
        .then((users) => {
            if (users.filter(existingUser => existingUser.id === user.id).length !== 0) {
                throw new Error('user exists');
            }
            console.log(user);
            fs.appendFile('./users-data.txt', JSON.stringify(user), (err) => {
                if (err) throw err;
            });
        })
        .catch((err) => {throw err})
    }
    generateUser(name, email, age) {
        const id = this.idGenerator(name + email + age);
        return {
            id: id,
            name: {
                name: 'name',
                type: 'text',
                value: name
            },
            email: {
                name: 'email',
                type: 'email',
                value: email
            },
            age: {
                name: 'age',
                type: 'number',
                value: age
            }
        }
    }
    idGenerator(string) {
        const length = string.length;
        let hash = 0;
        if (length === 0) return hash;
        for (let i = 0; i < length; i ++) {
            let char = string.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash;
        }
        return hash;
    }
}

module.exports = new DataManager();