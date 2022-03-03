import { Avatar, Badge, Box, Container, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import 'moment/locale/vi';
import Head from "next/head";
import Markdown from '../../../components/markdown/Markdown';
import constants from '../../../config/constants';


export async function getServerSideProps(context) {
    try {
        const { slug } = context.query

        const data = (await axios.get(`${constants.api}/post/get/${slug}`)).data.data

        return {
            props: {
                post: data
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

export default function Post({ post }) {
    return <Container maxW="container.md">
        <Head>
            <title>
                {post.title}
            </title>
        </Head>
        <Heading>
            {post.title}
        </Heading>

        <Text>
            Sửa đổi lần cuối {moment(post.updatedAt).fromNow()}
        </Text>

        <Stack direction="row">
            {post.topics.map(topic => (<Link
                href={`/topic/${topic}`}
                key={topic}>
                <a>
                    <Badge
                        colorScheme="green"
                    >
                        {topic}
                    </Badge>
                </a>
            </Link>))}
        </Stack>

        <Flex padding="20px 0">
            <Avatar name={post.author.fullName} />
            <Box ml="3">
                <Text>
                    {post.author.fullName}
                </Text>
                <Text>
                    @{post.author.username}
                </Text>
            </Box>
        </Flex>

        <Markdown>
            {post.content}
        </Markdown>

    </Container>
}