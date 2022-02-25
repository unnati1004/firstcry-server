const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const product_controller = require("./controller/nightwear_controller");
const Tshirt_controller = require("./controller/Tshirt_controller");
const thermal_controller = require("./controller/thermal_controller");

const app = express();
app.use(express.json());


const corsOrigin ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 app.use(cors(corsOrigin));
app.use("/nightwears", product_controller);
app.use("/tshirt",Tshirt_controller);
app.use("/thermal",thermal_controller);


app.listen(2345, () => {
    try {
        connect();
        console.log("listening 2345");
    } catch (e) {
        console.error({ message: e.message });
    }

})