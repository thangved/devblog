import { Container } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import PostCreate from '../../../../components/post/create/PostCreate';
import constants from '../../../../config/constants';

export async function getServerSideProps(context) {
    const { slug } = context.query

    const data = (await axios.get(`${constants.api}/post/_id/${slug}`)).data

    try {
        return {
            props: {
                post: data.data,
            }, // will be passed to the page component as props
        }
    }
    catch (error) {
        return {
            props: {
                post: {}
            }
        }
    }
}
export default function PostEdit({ post }) {
    return <Container maxW="container.lg">
        <Head>
            <title>{post.title}</title>
        </Head>
        <PostCreate update post={post} />

    </Container>
}