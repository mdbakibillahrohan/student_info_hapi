'use strict';
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const { addStudent, studentsSchema } = require('./controller/StudentController');
const database = require('./database/database');
const authMiddlware = require('./middleware/auth_middleware');
const { usersSchema, register, login } = require('./controller/AuthController');

const init = async () => {
    const server = Hapi.server({
        host: "localhost",
        port: "4000"
    })


    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return "Server running";
        }
    })

    server.route({
        method: 'POST',
        path: '/register',
        handler: (request, h) => {
            const userRgister = register(request, h);
            return userRgister;
        },
        options: {
            validate: {
                payload: usersSchema,
                failAction: async (request, h, err) => {
                    throw err;
                }
            }
        }
    })

    server.route({
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            return login(request, h);
        }
    })

    server.route({
        method: 'POST',
        path: '/add-student',
        handler: (request, h) => {
            const add_student = addStudent(request, h);
            return add_student;
        },
        options: {
            validate: {
                payload: studentsSchema,

            }

        }
    })

    server.route({
        method: 'GET',
        path: '/all-students',
        handler: async (request, h) => {
            try {
                if (request.pre.authMiddlware != undefined) {
                    let data = await database.query('SELECT * FROM students');
                    return data.rows;
                }
                return "You are not authenticated";
            } catch (error) {
                console.log(error)
            }

            // return request.authMiddlware;
        },
        options: {
            pre: [
                { assign: "authMiddlware", method: authMiddlware }
            ]
        }

    })

    await server.start();
    console.log("Server running on %s", server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();


