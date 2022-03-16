const { request, response } = require("express");
const Token = require("../utils/Token");
const ModelPost = require("../models/ModelPost");
const ModelUser = require("../models/ModelUser");

class PostController {
	/**
	 *
	 * @param {request} req
	 * @param {response} res
	 */
	async create(req, res) {
		const token = req.body.token;
		delete req.body.slug;
		delete req.body._id;
		delete req.body.author;
		delete req.body.createdAt;
		delete req.body.updatedAt;

		const user = Token.resolve(token);
		if (!user)
			return res.send({
				success: false,
				message: "Lỗi xác thực",
			});

		const newPost = new ModelPost({
			...req.body,
			author: user._id,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		});

		newPost.save((error) => {
			if (error)
				return res.send({
					success: false,
					message: error.toString(),
				});
			res.send({
				success: true,
				data: {
					slug: newPost.slug,
					_id: newPost._id,
				},
			});
		});
	}

	/**
	 *
	 * @param {request} req
	 * @param {response} res
	 */
	async remove(req, res) {
		const token = req.body.token;
		const postId = req.body.postId;

		const user = Token.resolve(token);
		if (!user)
			return res.send({
				success: false,
				message: "Lỗi xác thực",
			});

		try {
			const post = await ModelPost.findOne({
				author: user._id,
				_id: postId,
			});
			if (!post)
				return res.send({
					success: false,
					message: "Lỗi xác thực",
				});

			await ModelPost.findByIdAndDelete(postId);

			res.send({
				success: true,
				message: "Đã xóa bài viết",
			});
		} catch (error) {
			res.send({
				success: false,
				message: error.toString(),
			});
		}
	}
	/**
	 *
	 * @param {request} req
	 * @param {response} res
	 */
	async myPosts(req, res) {
		const token = req.body.token;

		const user = Token.resolve(token);
		if (!user)
			return res.send({
				success: false,
				message: "Lỗi xác thực",
			});

		const posts = await ModelPost.find({ author: user._id }).populate(
			"author"
		);
		res.send({
			success: true,
			data: posts.map((post) => ({
				...post.toObject(),
				author: {
					...post.toObject().author,
					password: false,
				},
			})),
		});
	}
	/**
	 *
	 * @param {request} req
	 * @param {response} res
	 */
	async topic(req, res) {
		const { topic } = req.params;
		if (!topic)
			return res.send({
				success: false,
				message: "Vui lòng nhập chủ đề",
			});

		const posts = await ModelPost.find({ topics: topic }).populate(
			"author"
		);
		res.send({
			success: true,
			data: posts.map((post) => ({
				...post.toObject(),
				author: {
					...post.toObject().author,
					password: false,
				},
			})),
		});
	}
	/**
	 *
	 * @param {request} req
	 * @param {response} res
	 */
	async user(req, res) {
		const { username } = req.params;
		if (!username)
			return res.send({
				success: false,
				message: "Vui lòng nhập username",
			});

		try {
			const user = await ModelUser.findOne({ username });
			if (!user)
				return res.send({
					success: false,
					message: "Không tìm thấy người dùng",
				});
			const posts = await ModelPost.find({ author: user._id }).populate(
				"author"
			);
			res.send({
				success: true,
				data: posts.map((post) => ({
					...post.toObject(),
					author: {
						...post.toObject().author,
						password: false,
					},
				})),
			});
		} catch (error) {
			res.send({
				success: false,
				message: error.toString(),
			});
		}
	}

	/**
	 *
	 * @param {request} req
	 * @param {response} res
	 */
	async slug(req, res) {
		const { slug } = req.params;
		if (!slug)
			return res.send({
				success: false,
				message: "Vui lòng nhập slug",
			});

		const post = await ModelPost.findOne({ slug }).populate("author");
		if (!post)
			return res.send({
				success: false,
				message: "Không tìm thấy bài viết",
			});
		res.send({
			success: true,
			data: {
				...post.toObject(),
				author: {
					...post.toObject().author,
					password: false,
				},
			},
		});
	}

	/**
	 *
	 * @param {request} req
	 * @param {response} res
	 */
	async _id(req, res) {
		const { _id } = req.params;
		if (!_id)
			return res.send({
				success: false,
				message: "Vui lòng nhập id",
			});

		const post = await ModelPost.findById(_id).populate("author");
		if (!post)
			return res.send({
				success: false,
				message: "Không tìm thấy bài viết",
			});
		res.send({
			success: true,
			data: {
				...post.toObject(),
				author: {
					...post.toObject().author,
					password: false,
				},
			},
		});
	}
	/**
	 *
	 * @param {request} req
	 * @param {response} res
	 */
	async update(req, res) {
		const token = req.body.token;
		const _id = req.body.postId;

		const user = Token.resolve(token);

		if (!user)
			return res.send({
				success: false,
				message: "Lỗi xác thực",
			});

		try {
			const post = await ModelPost.findOne({ author: user._id, _id });
			if (!post)
				return res.send({
					success: false,
					message: "Lỗi xác thực",
				});

			await ModelPost.findByIdAndUpdate(_id, {
				...req.body,
				updatedAt: Date.now(),
			});

			res.send({
				success: true,
				message: "Đã cập nhật bài viết",
			});
		} catch (error) {
			res.send({
				success: false,
				message: error.toString(),
			});
		}
	}
	/**
	 *
	 * @param {request} req
	 * @param {response} res
	 */
	async all(req, res) {
		const { page, limit } = req.query;
		try {
			const posts = await ModelPost.find({})
				.populate("author")
				.limit(limit)
				.skip(limit * page)
				.sort({ _id: -1 });
			res.send({
				success: true,
				data: posts.map((post) => ({
					...post.toObject(),
					author: {
						...post.toObject().author,
						password: false,
					},
				})),
			});
		} catch (error) {
			res.send({
				success: false,
				message: error.toString(),
			});
		}
	}
}

module.exports = new PostController();
