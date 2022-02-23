const express = require("express");
const connect = require("./config/db");

const app = express();






app.listen(2345, () => {
    try {
        connect();
        console.log("listening 2345");
    }catch(e){
        console.log(e);
    }
    
})