import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const authenticateJWT = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            // Check if the token is in the user's sessions array
            const db = mongoose.connection;
            const dbUser = await db.collection("active").findOne({ _id: user.id });

            if (!dbUser.sessions.includes(token)) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};