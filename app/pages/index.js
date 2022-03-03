import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Image, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ScrollTrigger from 'react-scroll-trigger';
import endpage from '../assets/images/endpage.jpg';
import thinking from '../assets/images/thinking.jpg';
import PostCard from '../components/post/card/PostCard';
import PostCreate from '../components/post/create/PostCreate';
import PostSkeletons from '../components/post/skeletons/PostSkeletons';
import constants from '../config/constants';
import { Auth } from '../providers/AuthProvider';

export default function Home() {
	const router = useRouter()
	const [showModal, setShowModal] = useState(false)
	const [current, setCurrent] = useState(-1)
	const [posts, setPosts] = useState([])
	const [end, setEnd] = useState(false)

	const { user } = useContext(Auth)

	useEffect(() => {
		if (current === -1 || end)
			return
		axios.get(`${constants.api}/post/all?page=${current}&limit=5`)
			.then(({ data }) => {
				if (!data.success)
					return toast.error(data.message)
				setPosts(prev => [...prev, ...data.data])
				setEnd(!data.data.length)
			})
			.catch(error => toast.error(error.toString()))
	}, [current, end])

	return (
		<Container
			paddingTop={2}
			maxW={showModal ? 'container.md' : 'container.sm'}
			transition=".4s ease"
		>
			<Head>
				<title>Trang chủ</title>
			</Head>
			<Box
				border="1px solid #ddd"
				borderRadius="10"
				overflow="hidden"
			>
				<Image src={thinking.src} alt="thinking" />
				{
					!showModal && user.login ? <VStack
						padding={2}
						onClick={setShowModal}
					>
						<Input
							placeholder="Bạn đang nghĩ gì?"
							readOnly />
						<Button
							isFullWidth
							colorScheme="blue"
							rightIcon={<AddIcon />}
						>
							Tạo bài viết
						</Button>
					</VStack> : user.login && <PostCreate
						onCreate={(post) => {
							setShowModal(false)
							router.push(`/post/${post.slug}`)
						}}
						onCancel={() => setShowModal(false)}
					/>
				}
				{
					!user.login && <Input
						placeholder="Vui lòng đăng nhập để đăng bài"
						readOnly />
				}
			</Box>

			<VStack padding="10px 0">
				{
					posts.map(post => <PostCard key={post._id} post={post} />)
				}
			</VStack>

			<ScrollTrigger onEnter={() => setCurrent(prev => ++prev)} />

			{
				!end ? <PostSkeletons /> : <Image borderRadius="10px" src={endpage.src} alt="end page" />
			}

		</Container>
	)
}
