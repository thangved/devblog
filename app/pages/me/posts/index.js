import { Box, Button, Checkbox, Container, Divider, Flex, Heading, VStack } from "@chakra-ui/react";
import { useContext, useState } from 'react';
import { Auth } from '../../../providers/AuthProvider';
import { useEffect } from 'react';
import axios from "axios";
import constants from '../../../config/constants';
import { toast } from 'react-hot-toast';
import PostCard from '../../../components/post/card/PostCard';
import Head from "next/head";
import PostSkeletons from '../../../components/post/skeletons/PostSkeletons';
import { DeleteIcon } from "@chakra-ui/icons";
import { Alert } from '../../../providers/AlertProvider';

export default function MyPosts() {
    const { token } = useContext(Auth)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [checking, setChecking] = useState(false)
    const [selected, setSelected] = useState([])
    const { open } = useContext(Alert)

    useEffect(() => {
        if (!token)
            return

        axios.post(`${constants.api}/post/me`, { token })
            .then(({ data }) => {
                if (!data.success)
                    return toast.error(data.message)

                setPosts(data.data)
                setLoading(false)
            })
            .catch(error => toast.error(error.toString()))
    }, [token])

    const handleDelete = () => {
        selected.map(async (postId) => {
            const data = (await axios.post(`${constants.api}/post/remove`, {
                postId,
                token,
            })).data
            if (!data.success)
                return toast.error(data.message)

            setPosts(prev => prev.filter(post => post._id !== postId))
            setSelected(prev => prev.filter(_id => _id !== postId))
            toast.success(`Đã xóa bài viết ${postId}`)
        })
    }

    return <Container maxW="container.sm">
        <Head>
            <title>
                Bài viết của tôi
            </title>
        </Head>

        <Box mt="2" mb="2">
            <Heading flex="1">
                Bài viết của tôi
            </Heading>

            <Flex justifyContent="flex-end">
                {
                    checking && <Checkbox
                        onChange={event => {
                            if (!event.target.checked)
                                return setSelected([])
                            setSelected(posts.map(post => post._id))
                        }}
                        isChecked={selected.length === posts.length}
                    >
                        Tất cả
                    </Checkbox>
                }
                {
                    checking && selected.length ? <Button
                        onClick={() => {
                            open({
                                title: 'Xóa bài viết',
                                okText: 'Xóa',
                                cancelText: 'Hủy',
                                onOk: handleDelete,
                                message: `Bạn có muốn xóa ${selected.length} bài viết sau: ${selected.join('\n')}`
                            })
                        }}
                        ml="2"
                        leftIcon={<DeleteIcon />} colorScheme="red">
                        Xóa {selected.length} bài viết
                    </Button> : <></>
                }
                <Button
                    ml="2"
                    onClick={() => setChecking(prev => !prev)}>
                    {checking ? 'Hủy' : 'Chọn'}
                </Button>
            </Flex>

        </Box>

        <Divider />

        {
            loading && <PostSkeletons />
        }

        <VStack mt="2">
            {
                posts.map(post => (
                    checking ? <Checkbox
                        onChange={event => {
                            if (!event.target.checked)
                                return setSelected(prev => prev.filter(e => e !== post._id))
                            setSelected(prev => [...prev, post._id])
                        }}
                        isChecked={selected.includes(post._id)}
                        key={post._id}>
                        <PostCard post={post} />
                    </Checkbox> : <PostCard
                        disabled
                        key={post._id}
                        post={post} />
                )).reverse()
            }
        </VStack>
    </Container>
}