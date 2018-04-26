const fs = require('fs');

class DataManager {
    parse() {
        return new Promise((resolve, reject) => {
            fs.readFile('users-data.txt', {encoding: 'utf8'}, (err, data) => {
                if (err) throw err;
                const users = JSON.parse(data);
                resolve(users);
            });
        })
    }
    addUser(user) {
        return this.parse()
        .then((users) => {
            if (users.filter(existingUser => existingUser.id === user.id).length !== 0) {
                return new Error('Whoops! That user already exists.');
            }
            users.push(user);
            return users;
        })
        .then(users => new Promise((resolve, reject) => {
            fs.truncate('./users-data.txt', (err) => {
                if (err) reject(err);
                resolve(users);
            });
        }))
        .then((users) => {
            fs.writeFile('./users-data.txt', JSON.stringify(users), (err) => {
                if (err) return new Error('Sorry, Problem occurred while saving data, we will do everything we can to fix it.');
                return 'User added';
            });
        })
    }
    generateUser(name, email, age) {
        const id = this.idGenerator(name + email + age);
        return {
            id: id,
            name: name,
            email: email,
            age: age
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
    replaceUser(userId, newUser) {
        const filePath = './users-data.txt';
        const userID = userId;
        return this.parse()
        // replace the user in the array
        .then(users => {
            const userIndex = users.findIndex((user) => user.id == userID);
            if (userIndex === -1) throw new Error('User not found');
            if(newUser === '') users.splice(userIndex, 1);
            else users.splice(userIndex, 1, newUser);
            return users;
        })
        // clear the file
        .then((users) => {
            return new Promise((resolve, reject) => {
                fs.truncate(filePath, (err) => {
                    if (err) reject(err);
                    resolve(users);
                });
            });
        })
        .then(users => new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(users), {encoding: 'utf8'}, (err) => {
                if (err) reject(new Error('error writing file'));
                console.log('users written', users);
                resolve();
            })
        }))
    }
}

module.exports = new DataManager();