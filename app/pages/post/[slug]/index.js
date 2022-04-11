import { SmallAddIcon, ViewIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Badge,
	Box,
	Center,
	Container,
	Divider,
	Flex,
	Heading,
	HStack,
	Spacer,
	Text,
	Tooltip,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import "moment/locale/vi";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Markdown from "../../../components/markdown/Markdown";
import PostCard from "../../../components/post/card/PostCard";
import PostSkeletons from "../../../components/post/skeletons/PostSkeletons";
import PostTools from "../../../components/post/tools/PostTools";
import constants from "../../../config/constants";
import { Auth } from "../../../providers/AuthProvider";

export async function getServerSideProps(context) {
	try {
		const { slug } = context.query;

		const data = (await axios.get(`${constants.api}/post/get/${slug}`)).data
			.data;

		return {
			props: {
				_post: data || {},
			},
		};
	} catch (error) {
		return {
			props: {
				_post: null,
			},
		};
	}
}

export default function Post({ _post }) {
	const { token, user } = useContext(Auth);
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState(_post);
	const router = useRouter();

	useEffect(() => {
		axios
			.get(`${constants.api}/post/user/${post.author?.username}`)
			.then(({ data }) => {
				if (!data.success) return router.back();

				setPosts(data.data);
				setLoading(false);
			})
			.catch((error) => toast.error(error.toString()));
	}, [post, post.author?.username, router]);

	const onLikePost = async () => {
		try {
			const { data } = await axios.post(`${constants.api}/post/like`, {
				token,
				postId: post._id,
			});

			if (!data.success) return toast.error(data.message);
			toast.success(data.message);

			if (post.likes.map((e) => e._id).includes(user._id))
				return setPost((prev) => ({
					...prev,
					likes: [...prev.likes.filter((e) => e._id !== user._id)],
				}));
			setPost((prev) => ({
				...prev,
				likes: [...prev.likes, user],
			}));
		} catch (error) {
			toast.error(error.toString());
		}
	};

	useEffect(() => {
		setPost(_post);
	}, [_post, router.pathname]);

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
				<Box ml="3" flex="1">
					<Text>{post.author?.fullName}</Text>
					<Text>@{post.author?.username}</Text>
				</Box>

				<Tooltip label={`${post.likes.length} lượt thích`}>
					<Center
						cursor="pointer"
						align="center"
						pl="4"
						pr="4"
						onClick={onLikePost}
					>
						<SmallAddIcon />
						<Text fontSize="sm">{post.likes?.length}</Text>
					</Center>
				</Tooltip>

				<Tooltip label={`${post.views} lượt xem`}>
					<Flex alignItems="center">
						<ViewIcon />
						<Text ml="2" fontSize="sm">
							{post.views}
						</Text>
					</Flex>
				</Tooltip>
			</Flex>

			<Markdown>{post.content}</Markdown>

			<Spacer height={20} />

			<div
				className="fb-comments"
				data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
				data-width=""
				data-numposts="5"
			></div>

			<Heading>Bài viết cùng tác giả</Heading>
			<Divider />
			<VStack mt="2">
				{posts.map((p) => (
					<PostCard key={p._id} post={p} />
				))}
			</VStack>

			{loading && <PostSkeletons />}
		</Container>
	);
}

