const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const ModelPost = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		slug: "title",
		unique: true,
	},
	author: {
		type: String,
		ref: "users",
		required: true,
	},
	topics: {
		type: [
			{
				type: String,
			},
		],
		default: [],
		required: true,
	},
	public: {
		type: Boolean,
		default: false,
		required: true,
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

module.exports = mongoose.model("posts", ModelPost);
