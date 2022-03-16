import { Badge, Container, Divider, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import constants from "../../../config/constants";
import { toast } from "react-hot-toast";
import PostCard from "../../../components/post/card/PostCard";

export default function Topic() {
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (!router.query.topic) return;
		axios
			.get(`${constants.api}/post/topic/${router.query.topic}`)
			.then(({ data }) => {
				if (!data.success) return toast.error(data.message);
				setPosts(data.data);
			})
			.catch((error) => toast.error(error.toString()));
	}, [router.query.topic]);

	return (
		<Container maxW="container.md">
			<Head>
				<title>{`Chủ đề "${router.query.topic || ""}"`}</title>
			</Head>
			<Heading>
				Chủ đề {'"'}
				<Badge fontSize="0.6em" colorScheme="green" variant="outline">
					{router.query.topic}
				</Badge>
				{'"'}
			</Heading>
			<Divider />
			<VStack>
				{posts.map((post) => (
					<PostCard
						highlight={router.query.topic}
						key={post._id}
						post={post}
					/>
				))}
			</VStack>
		</Container>
	);
}
