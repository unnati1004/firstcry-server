const express = require("express");
const connect = require("./config/db");
const { register, login } = require("./controllers/auth.controller")

const app = express();

app.use(express.json());

app.post("/register", register);
app.post("/login",login);

app.listen(2345, () => {
    try {
        connect();
        console.log("listening 2345");
    } catch (e) {
        console.log(e);
    }

})