import { LockIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Badge,
	Box,
	Flex,
	Heading,
	HStack,
	Image,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRef } from "react";
import Markdown from "../../markdown/Markdown";
import PostTools from "../tools/PostTools";
import styles from "./PostCard.module.scss";

/**
 *
 * @param {string} markdown
 */
const getImage = (markdown) => {
	const mImg = markdown.match(/!\[.+\]\(.+\)/);
	const sImg = mImg ? mImg[0] : "";

	return sImg.replace(/!\[.+\]\(/, "").replace(")", "");
};

export default function PostCard({ post, highlight, disabled }) {
	const refPost = useRef();
	const imageLink = getImage(post.content);

	const thumbnail = imageLink ? (
		<Image
			borderRadius="5px"
			width="100%"
			src={imageLink}
			alt={post.title}
		/>
	) : (
		<Markdown>{`${post.content.slice(0, 200)}...`}</Markdown>
	);

	return (
		<Box className={styles.wrapper} ref={refPost}>
			<HStack marginBottom="4">
				<Avatar name={post.author.fullName} size="md" />
				<div
					style={{
						flex: 1,
					}}
				>
					<Heading size="sm">{post.author.fullName}</Heading>
					<Text textAlign="left">{post.author.username}</Text>
				</div>

				<PostTools
					post={post}
					onRemove={() => refPost.current?.remove()}
				/>
			</HStack>
			<Heading size="sm" marginBottom="2">
				{post.title}
			</Heading>

			<Flex>
				<Text fontSize="sm" flex="1">
					{`Tạo vào ${moment(
						post.createdAt
					).calendar()} (Sửa đổi lần cuối ${moment(
						post.updatedAt
					).fromNow()})`}
				</Text>
				{!post?.public && (
					<Tooltip label="Không cồng khai">
						<LockIcon />
					</Tooltip>
				)}
			</Flex>

			<HStack padding="10px 0" wrap="wrap">
				{post.topics.map((topic) => (
					<Link key={topic} href={`/topic/${topic}`}>
						<a>
							<Badge
								colorScheme="green"
								variant={
									highlight === topic ? "outline" : "subtle"
								}
							>
								{topic}
							</Badge>
						</a>
					</Link>
				))}
			</HStack>
			{disabled ? (
				thumbnail
			) : (
				<Link href={`/post/${post.slug}`}>
					<a>{thumbnail}</a>
				</Link>
			)}
		</Box>
	);
}
