import { Container, Divider, Heading } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import PostCreate from "../../../../components/post/create/PostCreate";
import constants from "../../../../config/constants";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
	const { slug } = context.query;

	const data = (await axios.get(`${constants.api}/post/_id/${slug}`)).data;

	try {
		return {
			props: {
				post: data.data,
			}, // will be passed to the page component as props
		};
	} catch (error) {
		return {
			props: {
				post: {},
			},
		};
	}
}
export default function PostEdit({ post }) {
	const router = useRouter();
	return (
		<Container maxW="container.lg">
			<Head>
				<title>{post.title}</title>
			</Head>
			<Heading>Chỉnh sửa bài viết</Heading>
			<Divider />
			<PostCreate
				update
				post={post}
				onCreate={() => router.back()}
				onCancel={() => router.back()}
			/>
		</Container>
	);
}
