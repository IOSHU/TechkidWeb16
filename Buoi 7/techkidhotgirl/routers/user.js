const express = require("express");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();

const UserModel = require("../models/user");

// TODO: CRUD for user
// /api/users
UserRouter.post("/", (req, res) => {
	const newUser = req.body;
	const salt = bcrypt.genSaltSync(12);
	const hashPassword = bcrypt.hashSync(newUser.password, salt || 12);
	newUser.password = hashPassword;
	UserModel.create(newUser, (err, userCreated) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.status(201).json({ success: 1, message: "Create success!"});
	});
});

UserRouter.get("/", (req, res) => {
	UserModel.find({}, (err, users) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.json({ success: 1, message: "Success!", data: users });
	});
});

UserRouter.get("/:id", (req, res) => {
	const userId = req.params.id;
	UserModel.findById(userId, (err, userFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!userFound || !userFound._id) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, message: "Success!", data: userFound });
	});
});

UserRouter.put("/:id", (req, res) => {
	const update = req.body;
	const userId = req.params.id;
	UserModel.findById(userId, (err, userFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!userFound || !userFound._id) res.status(404).json({ success: 0, message: "Not found!" })
		else {
			if(update.password) {
				if(!bcrypt.compareSync(update.password, userFound.password)) {
					update.password = bcrypt.hashSync(update.password, 12);
				} else {
					update.password = undefined;
				}
			}

			for(key in update) {
				if(update[key] && userFound[key]) {
					userFound[key] = update[key];
				}
			}
			
			userFound.save(function(err, userUpdated) {
				if(err) res.status(500).json({ success: 0, message: err })
				else res.json({ success: 1, message: "Update success!", data: userUpdated });
			});
		};
	});
});

UserRouter.delete("/:id", (req, res) => {
	const userId = req.params.id;
	UserModel.findByIdAndDelete(userId, (err) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.json({ success: 1, message: "Delete success!"});
	});
});

module.exports = UserRouter;