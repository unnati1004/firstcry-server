const express = require("express");
const Tshirt = require("../model/Tshirt_model");
const router = express.Router();

router.get("", async (req, res) => {
    try {
        const item = await Tshirt.find().lean().exec();
        res.send(item);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})
module.exports = router;