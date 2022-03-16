import {
	Box,
	Container,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import constants from "../../../config/constants";
import { Auth } from "../../../providers/AuthProvider";
import Posts from "./Posts";
import Statistics from "./Statistics";

export default function MyPosts() {
	const { token } = useContext(Auth);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!token) return;

		axios
			.post(`${constants.api}/post/me`, { token })
			.then(({ data }) => {
				if (!data.success) return toast.error(data.message);

				setPosts(data.data);
				setLoading(false);
			})
			.catch((error) => toast.error(error.toString()));
	}, [token]);

	return (
		<Container maxW="container.lg">
			<Head>
				<title>Bài viết của tôi</title>
			</Head>

			<Box mt="2" mb="2">
				<Heading flex="1">Bài viết của tôi</Heading>
			</Box>

			<Tabs>
				<TabList>
					<Tab>Bài viết</Tab>
					<Tab>Thống kê</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<Posts loading={loading} posts={posts} />
					</TabPanel>
					<TabPanel>
						<Statistics loading={loading} posts={posts} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container>
	);
}
