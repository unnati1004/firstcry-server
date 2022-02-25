// const express = require("express");
require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
    // console.log(process.env);
    // return jwt.sign({ user }, process.env.FIRSTCRY_KEY);
    return jwt.sign({ user }, "Vineeth")
};

// User Registertion 
const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        if (user)
            return res.status(400).send({ message: "Please try another email" });

        user = await User.create(req.body);
        const token = newToken(user);
        res.send({ user, token });
    } catch (e) {
        console.log(e);
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user)
            return res.status(400).send({ message: "Please try another email" });

        // console.log(user.password);
        let match = user.checkPassword(req.body.password);

        if (!match)
            return res.status(400).send({ message: "Please try another email" });

        res.send(user)
    } catch (e) {
        console.log(e);
    }
}


module.exports = { register, login }