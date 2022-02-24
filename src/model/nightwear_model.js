const mongoose = require("mongoose");

const product_schema = mongoose.Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true }
})

module.exports = mongoose.model("nightwears", product_schema);