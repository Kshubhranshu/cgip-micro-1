const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const discover = require("./routes/discover");
const admin = require("./routes/admin");
const initializeDatabase = require("./config/db");

const app = express();

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
app.use("/api/discover", discover);

app.use((req, res, next) =>
    res.status(404).send("You are looking for something that we not have!")
);

app.use((err, req, res, next) => res.status(500).send("Something went wrong!"));

const PORT = process.env.PORT || 3000;
const HOST = process.env.host || "localhost";

app.listen(port, () => {
    console.log(` Shuffle app listening at http://${HOST}:${PORT}`);
});
