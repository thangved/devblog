const mongoose = require("mongoose");

const modelUser = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	gender: {
		type: Number,
		required: true,
		default: 0,
	},
	createdAt: {
		type: Number,
		required: true,
		default: Date.now(),
	},
	updatedAt: {
		type: Number,
		required: true,
		default: Date.now(),
	},
});

module.exports = mongoose.model("users", modelUser);
