const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const authenticateJWT = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
            if (err) {
                // If the token is invalid or expired, remove it from the user's sessions
                await mongoose.connection.collection("active").updateOne(
                    { _id: user.id },
                    { $pull: { sessions: token } }
                );
                //
                return res.sendStatus(403);
            }

            // Attach user information to the request
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;