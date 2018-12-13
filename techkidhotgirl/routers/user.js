const express = require('express');
const UserRouter = express.Router();
const UserModel = require("../models/user");
//TODO:CRUD for User
//read-get
//get all
UserRouter.get("/users", (req, res) => {
    UserModel.find({}, (err, users) => {
        if (err) {
            res.status(500).json({ success: 0, message: err })
        } else console.log(users);
    })
})
//get one
UserRouter.get("/users/:ID", (req, res) => {
    const userid = req.params.ID;
    UserModel.findById(userid, (err, userFound) => {
        if (err) {
            res.status(500).json({ success: 0, message: err })
        } else res.json(userFound);
    })
})
//create-post
UserRouter.post("/api/users", (req, res) => {
    const newUser = req.body || {};
    UserModel.create(newUser, (err, userModel) => {
        if (err) {
            res.status(500).json({ success: 0, message: err })
        } else res.status(201).json({ success: 1, message: "Create success" });
    })
})
//update-put
UserRouter.put("/api/users/:ID", (req, res) => {
    const userchange = req.body || {};
    const userid = req.params.ID
    UserModel.findById(userid, (err, userFound) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else
            if (!userFound) res.send({ message: 'user not found!', success: 0 })
            else {
                userFound = userchange;
                userFound.save((err) => {
                    if (err) res.status(500).json({ success: 0, message: err })
                    else
                        res.json(userFound);
                })
            }
    })
})
//del
UserRouter.delete("/api/users/:ID",(req,res)=>{
    const userid = req.params.ID
    UserModel.findByIdAndDelete(userid, (err, userFound) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else
            if (!userFound) res.send({ message: 'user not found!', success: 0 })
            else {
                res.json(userFound);
            }
    })
})
module.exports = UserRouter;