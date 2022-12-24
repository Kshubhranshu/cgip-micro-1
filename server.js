const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const discover = require("./routes/discover");
const admin = require("./routes/admin");
const auth = require("./routes/auth");
const initializeDatabase = require("./config/db");
var jwt = require("jsonwebtoken");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDatabase();

app.get("/api/health", (req, res) => {
    res.send({
        time: new Date(),
        server: "Shuffle Backend",
        status: "Active",
    });
});

app.use("/api/admin", admin);
// app.use("/api/auth", auth);
app.use("/api/discover", verifyAuthToken, discover);

async function verifyAuthToken(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(400).send("Un-authorized to access data!");
        }

        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (decoded) {
            next();
        } else {
            res.status(400).send("Invalid token!");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Invalid token!");
    }
}

function authorizeUser(req, res, next) {}

app.use((req, res, next) =>
    res.status(404).send("You are looking for something that we not have!")
);

app.use((err, req, res, next) => res.status(500).send("Something went wrong!"));

const PORT = process.env.PORT || 3000;
const HOST = process.env.host || "localhost";

app.listen(PORT, () => {
    console.log(` Shuffle app listening at http://${HOST}:${PORT}`);
});
