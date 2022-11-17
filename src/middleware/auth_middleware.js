
const jwt = require('jsonwebtoken');

const authMiddlware = (request, reply) => {
    try {
        ({ auth_token } = request.headers);
        let isAuthenticate = jwt.verify(auth_token, process.env.JWT_SECRET);
        console.log(isAuthenticate);
        return isAuthenticate;
    } catch (err) {
        console.log(err);
    }
}

module.exports = authMiddlware;