const mongoose = require("mongoose");

const connect = async () => {
    return await mongoose.connect("mongodb+srv://firstcry:firstcry_123@cluster0.db8ed.mongodb.net/firstcry?retryWrites=true&w=majority")
}

module.exports=connect;