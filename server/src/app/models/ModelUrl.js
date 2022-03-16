const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const ModelUrl = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		unique: true,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		ref: "users",
		required: true,
	},
	count: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Number,
		default: Date.now(),
	},
	updatedAt: {
		type: Number,
		default: Date.now(),
	},
});

module.exports = mongoose.model("urls", ModelUrl);
