import { Avatar, Badge, Box, Heading, HStack, Text } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRef } from "react";
import Markdown from "../../markdown/Markdown";
import PostTools from "../tools/PostTools";
import styles from './PostCard.module.scss';

export default function PostCard({ post, highlight, disabled }) {
    const refPost = useRef()

    return <Box
        className={styles.wrapper}
        ref={refPost}>
        <HStack marginBottom="4">
            <Avatar
                name={post.author.fullName}
                size="md" />
            <div style={{
                flex: 1
            }}>
                <Heading size="sm">
                    {post.author.fullName}
                </Heading>
                <Text textAlign="left">
                    {post.author.username}
                </Text>
            </div>

            <PostTools
                post={post}
                onRemove={() => refPost.current?.remove()}
            />

        </HStack>
        <Heading size="sm" marginBottom="2">
            {post.title}
        </Heading>
        <Text>
            Tạo vào {moment(post.createdAt).calendar()} (Sửa đổi lần cuối {moment(post.updatedAt).fromNow()})
        </Text>

        <HStack padding="10px 0" wrap="wrap">
            {
                post.topics.map(topic => (<Link key={topic} href={`/topic/${topic}`}>
                    <a>
                        <Badge
                            colorScheme="green"
                            variant={highlight === topic ? 'outline' : 'subtle'}>
                            {topic}
                        </Badge>
                    </a>
                </Link>))
            }
        </HStack>
        {
            disabled ? <Markdown>
                {`${post.content.slice(0, 200)}...`}
            </Markdown> : <Link href={`/post/${post.slug}`}>
                <a>
                    <Markdown>
                        {`${post.content.slice(0, 200)}...`}
                    </Markdown>
                </a>
            </Link>
        }

    </Box>
}