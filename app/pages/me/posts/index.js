import { Container, Divider, Heading, VStack } from "@chakra-ui/react";
import { useContext, useState } from 'react';
import { Auth } from '../../../providers/AuthProvider';
import { useEffect } from 'react';
import axios from "axios";
import constants from '../../../config/constants';
import { toast } from 'react-hot-toast';
import PostCard from '../../../components/post/card/PostCard';
import Head from "next/head";
import PostSkeletons from '../../../components/post/skeletons/PostSkeletons';

export default function MyPosts() {
    const { token } = useContext(Auth)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

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

    return <Container maxW="container.sm">
        <Head>
            <title>
                Bài viết của tôi
            </title>
        </Head>

        <Heading>
            Bài viết của tôi
        </Heading>

        <Divider />

        {
            loading && <PostSkeletons />
        }

        <VStack mt="2">
            {
                posts.map(post => (<PostCard key={post._id} post={post} />))
            }
        </VStack>
    </Container>
}