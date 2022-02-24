const express = require("express");
const product = require("../model/product_model");
const router = express.Router();

router.get("", async (req, res) => {
    try {
        const item = await product.find().lean().exec();
        res.send(item);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})
module.exports = router;