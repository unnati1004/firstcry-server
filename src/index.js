const express = require("express");
const connect = require("./config/db");
const { register, login } = require("./controllers/auth.controller")
const product_controller = require("./controller/nightwear_controller");
const Tshirt_controller = require("./controller/Tshirt_controller");

const app = express();

require("dotenv").config()

app.use(express.json());

app.post("/register", register);
app.post("/login", login);

app.use("/nightwears", product_controller);
app.use("/tshirt", Tshirt_controller);

port = process.env.PORT || 3000;

app.listen(port, () => {
    try {
        connect();
        console.log(`listining to ${port}`);
    } catch (e) {
        console.error({ message: e.message });
    }

})