const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = {
    enforce: function (req, res, next) {
        const unsecure_paths = [
            '/test',
            '/user',
            '/login'
        ];

        if (unsecure_paths.indexOf(req.path) !== -1) {
            return next();
        }

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            req.user = decoded;
        } catch (err) {
            console.log('errrr', err);
            return res.status(401).send("Invalid Token123");
        }

        return next();
    }
}