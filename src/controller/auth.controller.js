require("dotenv").config();
const User = require("../model/user.model");
const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator')

const router = express.Router();
const newToken = (user) => {
    // console.log(process.env);
    // return jwt.sign({ user }, process.env.FIRSTCRY_KEY);
    return jwt.sign({ user }, "Vineeth")
};


// User Registertion 
router.post("", body("password")
    .isLength({ min: 8, max: 20 })
    .custom((value) => {
        let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (pattern.test(value)) {
            return true;
        }
        throw new Error("Password is not strong");
    }), async (req, res) => {
        try {
            const errors = validationResult(req);
            // errors = []
            if (!errors.isEmpty()) {
                let newErrors;
                newErrors = errors.array().map((err) => {
                    // console.log("err", err);
                    return { key: err.param, message: err.msg };
                });
                return res.status(400).send({ message: "Password is not strong" });
            }
            let user = await User.findOne({ email: req.body.email }).lean().exec();

            if (user)
                return res.status(400).send({ message: "Email already exists" });

            user = await User.create(req.body);
            const token = newToken(user);
            res.send({ user, token });
        } catch (e) {
            console.log(e);
        }
    });

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user)
            return res.status(400).send({ message: "Please try another email or password" });

        // console.log(user.password);
        let match = user.checkPassword(req.body.password);

        if (!match)
            return res.status(400).send({ message: "Please try another email or password" });

        res.send(user)
    } catch (e) {
        console.log(e);
    }
}


module.exports = { router, login }