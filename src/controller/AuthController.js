
const { setData } = require('../function/database_function');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const database = require('../database/database')



register = async (request, h) => {
    try {
        const insert = await setData('users', request.payload);
        if (insert.rowCount > 0) {
            const getUser = await database.query(`select * from users where email='${request.payload.email}'`);
            let token = jwt.sign(getUser.rows[0], process.env.JWT_SECRET);
            return token;
        }
        return Response(400);
    } catch (error) {
        throw error;
    }
}

// this function for looking up email exists or not 
const emailLookup = async (email) => {

    let emailValue = await database.query(`SELECT email FROM users WHERE email='${email}'`);

    if (emailValue.rowCount > 0) {
        // return false;
        throw new Error('Email already exist');
    }

}

const usersSchema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.required().external(emailLookup),
    password: Joi.string().min(5).max(16),
});




login = async (request, h) => {
    ({ email, password } = request.payload);
    const user = await database.query(`select * from users where email = '${email}'`);
    if (user.rowCount > 0) {
        console.log(user.rows);
        if (user.rows[0].password == password) {
            let token = jwt.sign(user.rows[0], process.env.JWT_SECRET);
            return token;
        }
        return "Please Enter the right creadentials";
    }
    return "Please Enter the right credentials";

}

module.exports = { 'usersSchema': usersSchema, 'register': register, 'login': login }