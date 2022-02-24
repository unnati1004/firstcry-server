// const express = require("express");
require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// const newToken = (user) => {
//     return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
// };

// User Registertion 
const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        if (user)
            return res.status(400).send({ message: "Please try another email" });

        user = await User.create(req.body);
        res.send({ user });
    } catch (e) {
        console.log(e);
    }
}

const login = async (req, res) => {
    try {
        const user = User.findOne({ email: req.body.email })

        if (!user)
            return res.status(400).send({ message: "Please try another email" });

        console.log(user.password);
        let match = user.checkPassword(req.body.password);

        if (!match)
            return res.status(400).send({ message: "Please try another email" });

        res.send(user)
    } catch (e) {
        console.log(e);
    }
}


module.exports = { register, login }