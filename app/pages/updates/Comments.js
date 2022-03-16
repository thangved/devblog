import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import { toast } from "react-hot-toast";
import { Box } from "@chakra-ui/react";
import Comment from "./Comment";

const Comments = () => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const getComments = async () => {
			try {
				const octokit = new Octokit();
				const { data } = await octokit.request(
					"GET /repos/thangved/devblog/comments"
				);
				setComments(data);
			} catch (error) {
				toast.error(error.toString());
			}
		};

		getComments();
	}, []);
	return (
		<Box>
			{comments
				.map((comment) => <Comment key={comment.id} data={comment} />)
				.reverse()}
		</Box>
	);
};

export default Comments;
