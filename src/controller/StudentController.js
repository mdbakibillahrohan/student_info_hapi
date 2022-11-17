const Joi = require('joi');
const database = require('../database/database');
const { setData } = require('../function/database_function');

// this function insert data to users table
addStudent = async (request, h) => {
    const student = request.payload;
    const insert = await setData('students', student);
    if (insert.rowCount > 0) {
        return "Success";
    }
    return "Error occured";

}


// this function for looking up email exists or not 
const emailLookup = async (email) => {

    let emailValue = await database.query(`SELECT email FROM students WHERE email='${email}'`);
    console.log(email);
    if (emailValue.rowCount > 0) {
        // return false;
        throw new Error('Email already exist');
    }

}


// this is the object of validation 
const studentsSchema = Joi.object({
    student_name: Joi.string().required().max(20).min(3),
    email: Joi.required().external(emailLookup),
    semester_id: Joi.required(),
    shift_id: Joi.required(),
    country_id: Joi.required()
});

module.exports = { 'addStudent': addStudent, 'studentsSchema': studentsSchema };