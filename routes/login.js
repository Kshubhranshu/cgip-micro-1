const { Router } = require("express");
const route = Router();

route.post("/login", async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const payload = { username: reqData.username };
        let result;

        if (!username || !password) {
            result = "Invalid credentials";
            return;
        }

        result = await generateAuthToken(payload);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

async function generateAuthToken(payload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: ACCESS_TOKEN_LIFE,
    });
    return accessToken;
}

async function verifyAuthToken(token, callback) {
    try {
        callback(null, jwt.verify(token, ACCESS_TOKEN_SECRET));
    } catch (err) {
        console.error(new Date(), "Invalid token! - ", token);
        return {};
    }
}

module.exports = route;
