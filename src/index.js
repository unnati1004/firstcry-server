const express = require("express");
const connect = require("./config/db");
const product_controller = require("./controller/product_controller")
const app = express();

app.use(express.json());

app.use("/nightwears", product_controller);



app.listen(2345, () => {
    try {
        connect();
        console.log("listening 2345");
    } catch (e) {
        console.error({ message: e.message });
    }

})