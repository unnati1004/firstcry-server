const express = require("express");
const thermal = require("../model/thermal_model");
const router = express.Router();

router.get("", async (req, res) => {
    try {
        const item = await thermal.find().lean().exec();
        res.send(item);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})
module.exports = router;