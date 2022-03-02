import { ChevronDownIcon, DeleteIcon, EditIcon, WarningIcon } from "@chakra-ui/icons";
import { Avatar, Badge, Box, Button, Heading, HStack, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useContext, useRef } from "react";
import { toast } from 'react-hot-toast';
import constants from '../../../config/constants';
import { Alert } from '../../../providers/AlertProvider';
import { Auth } from '../../../providers/AuthProvider';
import Markdown from "../../markdown/Markdown";
import styles from './PostCard.module.scss';

export default function PostCard({ post }) {
    const { user, token } = useContext(Auth)
    const { open } = useContext(Alert)

    const refPost = useRef()

    const handleDelete = async () => {
        try {
            const data = (await axios.post(`${constants.api}/post/remove`, {
                token,
                postId: post._id,
            })).data

            if (!data.success)
                return toast.error(data.message)

            toast.success('Đã xóa bài viết')
            refPost.current?.remove()
        }
        catch (error) {
            toast.error(error.toString())
        }
    }

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
            <Menu>
                <MenuButton
                    as={IconButton}
                    icon={<ChevronDownIcon />} />
                <MenuList>
                    {
                        user._id === post.author._id && <MenuItem
                            icon={<DeleteIcon />}
                            onClick={() => open({
                                open: true,
                                okText: 'Xóa',
                                cancelText: 'Không',
                                title: 'Xóa bài viết',
                                message: `Bạn có muốn xóa bài viết "${post.title}"`,
                                onOk: handleDelete,
                            })}
                        >
                            Xóa
                        </MenuItem>
                    }
                    {
                        user._id === post.author._id && <Link href={`/post/${post._id}/edit`}>
                            <a>
                                <MenuItem
                                    icon={<EditIcon />}>
                                    Chỉnh sửa
                                </MenuItem>
                            </a>
                        </Link>
                    }
                    <MenuItem
                        icon={<WarningIcon />}
                        onClick={() => toast.success('Đã báo cáo bài viết')}
                    >
                        Báo cáo bài viết
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
        <Heading size="sm" marginBottom="2">
            {post.title}
        </Heading>
        <Text>
            Sửa đổi lần cuối {moment(post.updatedAt).fromNow()}
        </Text>

        <HStack padding="10px 0">
            {
                post.topics.map(topic => (<Badge key={topic} colorScheme="green">
                    {topic}
                </Badge>))
            }
        </HStack>
        <Link href={`/post/${post.slug}`}>
            <Markdown>
                {`${post.content.slice(0, 200)}...`}
            </Markdown>
        </Link>
    </Box>
}