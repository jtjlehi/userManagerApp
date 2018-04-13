const fs = require('fs');

class DataManager {
    parse() {
        return new Promise((resolve, reject) => {
            fs.readFile('users-data.txt', {encoding: 'utf8'}, (err, data) => {
                if (err) throw err;
                let location = 0;
                const users = data.split('\n')
                    .filter(userString => userString !== "")
                    .map((userString, index) => {
                        let start = location;
                        let end = location + userString.length;
                        console.log('start: ', start);
                        console.log('end: ', end);
                        return {
                            userData: JSON.parse(userString),
                            index: {
                                start: start,
                                end: end
                            }
                        }
                        
                    });
                resolve(users);
            });
        })
    }
    addUser(user) {
        return this.parse()
        .then((users) => {
            if (users.filter(existingUser => existingUser.userData.id === user.id).length !== 0) {
                return new Error('Whoops! That user already exists.');
            }
            fs.appendFile('./users-data.txt', JSON.stringify(user) + '\n', (err) => {
                if (err) return new Error('Sorry, Problem occurred while saving data, we will do everything we can to fix it.');
                return 'User added';
            });
        })
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