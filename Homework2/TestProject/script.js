//Показать 20 рандомных паролей

const func = require('@crosid/generatepassword');


for (let i = 0; i < 20; i++){
    console.log(func.generateRandomPassword(8));
}