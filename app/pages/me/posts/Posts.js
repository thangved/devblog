import { DeleteIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Checkbox,
	Container,
	Divider,
	Flex,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import PostCard from "../../../components/post/card/PostCard";
import PostSkeletons from "../../../components/post/skeletons/PostSkeletons";
import constants from "../../../config/constants";
import { Alert } from "../../../providers/AlertProvider";
import { Auth } from "../../../providers/AuthProvider";

export default function Posts({ posts, loading }) {
	const { token } = useContext(Auth);
	const [checking, setChecking] = useState(false);
	const [selected, setSelected] = useState([]);
	const { open } = useContext(Alert);

	const handleDelete = () => {
		selected.map(async (postId) => {
			const data = (
				await axios.post(`${constants.api}/post/remove`, {
					postId,
					token,
				})
			).data;
			if (!data.success) return toast.error(data.message);

			setPosts((prev) => prev.filter((post) => post._id !== postId));
			setSelected((prev) => prev.filter((_id) => _id !== postId));
			toast.success(`Đã xóa bài viết ${postId}`);
		});
	};
	return (
		<Container maxW="container.sm">
			<Flex justifyContent="flex-end" mb="2">
				{checking && (
					<Checkbox
						onChange={(event) => {
							if (!event.target.checked) return setSelected([]);
							setSelected(posts.map((post) => post._id));
						}}
						isChecked={selected.length === posts.length}
					>
						Tất cả
					</Checkbox>
				)}
				{checking && selected.length ? (
					<Button
						onClick={() => {
							open({
								title: "Xóa bài viết",
								okText: "Xóa",
								cancelText: "Hủy",
								onOk: handleDelete,
								message: `Bạn có muốn xóa ${
									selected.length
								} bài viết sau: ${selected.join("\n")}`,
							});
						}}
						ml="2"
						leftIcon={<DeleteIcon />}
						colorScheme="red"
					>
						Xóa {selected.length} bài viết
					</Button>
				) : (
					<></>
				)}
				<Button ml="2" onClick={() => setChecking((prev) => !prev)}>
					{checking ? "Hủy" : "Chọn"}
				</Button>
			</Flex>

			<Divider />

			<Box>{loading && <PostSkeletons />}</Box>

			<VStack mt="2">
				{posts
					?.map((post) => (
						<Flex width="100%" key={post._id} alignItems="center">
							<Checkbox
								width={checking ? "50px" : "0"}
								opacity={checking ? 1 : 0}
								overflow="hidden"
								transition="0.4s ease"
								height="100%"
								display="flex"
								justifyContent="center"
								id={post._id}
								onChange={(event) => {
									if (!event.target.checked)
										return setSelected((prev) =>
											prev.filter((e) => e !== post._id)
										);
									setSelected((prev) => [...prev, post._id]);
								}}
								isChecked={selected.includes(post._id)}
								key={post._id}
							></Checkbox>
							<Box
								transition="0.4s ease"
								flex="1"
								onClick={() => {
									if (!checking) return;
									selected.includes(post._id)
										? setSelected((prev) => [
												...prev.filter(
													(e) => e !== post._id
												),
										  ])
										: setSelected((prev) => [
												...prev,
												post._id,
										  ]);
								}}
							>
								<PostCard disabled={checking} post={post} />
							</Box>
						</Flex>
					))
					.reverse()}
			</VStack>
		</Container>
	);
}
