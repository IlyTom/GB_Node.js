const express = require('express');
const fs = require('fs');
const joi = require('joi');

const app = express();
const usersFile = 'users.json';
let ID = JSON.parse(fs.readFileSync('uniqueId.json'));
uniqueID = ID.uniqueId;
let users = loadUsersFromFile();

function loadUsersFromFile() {
    try {
        const data = fs.readFileSync(usersFile);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveUsersToFile() {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}



const userSchema = joi.object({
    firstName: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    age: joi.number().min(0).max(150).required(),
    city: joi.string().min(1)
})


app.use(express.json());

app.get('/users', (req, res) => {
    res.send({ users });
});

app.get('/users/:id', (req, res) => {
    const userId = +req.params.id;

    const user = users.find(user => user.id === Number(userId));
    if (user) {
        res.send({ user });
    }
    else {
        res.status(404);
        res.send({ user: null });
    }
})


app.post('/users', (req, res) => {
    uniqueID += 1;
    ID.uniqueId = uniqueID;
    const newUser = {
        id: uniqueID,
        ...req.body
    };
    users.push(newUser);
    saveUsersToFile();
    fs.writeFileSync('uniqueId.json', JSON.stringify(ID));
    res.send({ id: uniqueID });
});

app.put('/users/:id', (req, res) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(404).send({ error: result.error.details });
    }
    const userId = +req.params.id;
    const user = users.find(user => user.id === Number(userId));
    if (user) {
        const { firstName, secondName, age, city } = req.body;
        user.firstName = firstName;
        user.secondName = secondName;
        user.age = age;
        user.city = city;
        saveUsersToFile();
        res.send({ user });
    }
    else {
        res.status(404);
        res.send({ user: null });
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = +req.params.id;
    const user = users.find(user => user.id === Number(userId));

    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        saveUsersToFile();
        res.send({ user });
    }
    else {
        res.status(404);
        res.send({ user: null });
    }
});



app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
})