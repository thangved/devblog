import { Box } from "@chakra-ui/react";
import { Octokit } from "@octokit/core";
import React, { useEffect, useState } from "react";
import Commit from "./Commit";

const Commits = () => {
	const [updates, setUpdates] = useState([]);

	useEffect(() => {
		const getUpdates = async () => {
			try {
				const octokit = new Octokit();
				const { data } = await octokit.request(
					"GET /repos/thangved/devblog/commits"
				);
				setUpdates(data);
			} catch (error) {
				toast.error(error.toString());
			}
		};

		getUpdates();
	}, []);
	return (
		<Box>
			{updates.map((update) => (
				<Commit data={update} key={update.sha} />
			))}
		</Box>
	);
};

export default Commits;
