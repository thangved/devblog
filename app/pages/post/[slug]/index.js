import {
	Avatar,
	Badge,
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	HStack,
	Spacer,
	Text,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import "moment/locale/vi";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Markdown from "../../../components/markdown/Markdown";
import PostCard from "../../../components/post/card/PostCard";
import PostSkeletons from "../../../components/post/skeletons/PostSkeletons";
import PostTools from "../../../components/post/tools/PostTools";
import constants from "../../../config/constants";

export async function getServerSideProps(context) {
	try {
		const { slug } = context.query;

		const data = (await axios.get(`${constants.api}/post/get/${slug}`)).data
			.data;

		return {
			props: {
				post: data || {},
			},
		};
	} catch (error) {
		return {
			props: {
				post: {},
			},
		};
	}
}

export default function Post({ post }) {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const router = useRouter();

	useEffect(() => {
		axios
			.get(`${constants.api}/post/user/${post.author?.username}`)
			.then(({ data }) => {
				if (!data.success) return toast.error(data.message);

				setPosts(data.data);
				setLoading(false);
			})
			.catch((error) => toast.error(error.toString()));
	}, [post.author?.username]);
	return (
		<Container maxW="container.md">
			<Head>
				<title>{post.title}</title>
			</Head>

			<Flex mt="2">
				<Heading flex="1">{post.title}</Heading>
				<PostTools
					post={post}
					onRemove={() => {
						router.back();
					}}
				/>
			</Flex>

			<Text>Tạo vào {moment(post.createdAt).calendar()}</Text>
			<Text>Sửa đổi lần cuối {moment(post.updatedAt).fromNow()}</Text>

			<HStack wrap="wrap">
				{post.topics?.map((topic) => (
					<Link href={`/topic/${topic}`} key={topic}>
						<a>
							<Badge colorScheme="green">{topic}</Badge>
						</a>
					</Link>
				))}
			</HStack>

			<Flex padding="20px 0">
				<Avatar name={post.author?.fullName} />
				<Box ml="3">
					<Text>{post.author?.fullName}</Text>
					<Text>@{post.author?.username}</Text>
				</Box>
			</Flex>

			<Markdown>{post.content}</Markdown>

			<Spacer height={20} />

			<Heading>Bài viết cùng tác giả</Heading>
			<Divider />
			<VStack mt="2">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</VStack>

			{loading && <PostSkeletons />}
		</Container>
	);
}
