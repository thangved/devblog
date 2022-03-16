import {
	ChevronDownIcon,
	CopyIcon,
	DeleteIcon,
	EditIcon,
	LinkIcon,
	WarningIcon,
} from "@chakra-ui/icons";
import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import constants from "../../../config/constants";
import { Alert } from "../../../providers/AlertProvider";
import { Auth } from "../../../providers/AuthProvider";
import { Share } from "../../../providers/ShareProvider";
import getDomain from "../../../utils/getDomain";

export default function PostTools({ post, onRemove = () => {} }) {
	const { user, token } = useContext(Auth);
	const { openShare } = useContext(Share);
	const { open } = useContext(Alert);

	const router = useRouter();

	const handleDelete = async () => {
		try {
			const data = (
				await axios.post(`${constants.api}/post/remove`, {
					token,
					postId: post._id,
				})
			).data;

			if (!data.success) return toast.error(data.message);

			toast.success("Đã xóa bài viết");
			onRemove();
		} catch (error) {
			toast.error(error.toString());
		}
	};

	const handleCopy = async () => {
		toast.promise(
			axios.post(`${constants.api}/post/create`, {
				...post,
				token,
				_id: null,
			}),
			{
				loading: "Đang sao chép",
				success: ({ data }) => {
					if (!data.success) return data.message;

					router.push(`/post/${data.data.slug}`);
					return "Đã sao chép bài viết";
				},
				error: (error) => error.toString(),
			}
		);
	};
	return (
		<Menu>
			<Tooltip label="Xem một số tùy chọn">
				<MenuButton as={IconButton} icon={<ChevronDownIcon />} />
			</Tooltip>
			<MenuList>
				{user._id === post.author?._id && (
					<MenuItem
						color="red"
						icon={<DeleteIcon />}
						onClick={() =>
							open({
								open: true,
								okText: "Xóa",
								cancelText: "Không",
								title: "Xóa bài viết",
								message: `Bạn có muốn xóa bài viết "${post.title}"`,
								onOk: handleDelete,
							})
						}
					>
						Xóa
					</MenuItem>
				)}
				{user._id === post.author?._id && (
					<Link href={`/post/${post._id}/edit`}>
						<a>
							<MenuItem icon={<EditIcon />}>Chỉnh sửa</MenuItem>
						</a>
					</Link>
				)}
				{user._id === post.author?._id && (
					<MenuItem icon={<CopyIcon />} onClick={handleCopy}>
						Tạo bản sao
					</MenuItem>
				)}
				<MenuItem
					icon={<LinkIcon />}
					onClick={() =>
						openShare(
							`${getDomain()}/post/${post.slug}`,
							post.title
						)
					}
				>
					Chia sẻ
				</MenuItem>
				<MenuItem
					icon={<WarningIcon />}
					onClick={() => toast.success("Đã báo cáo bài viết")}
				>
					Báo cáo bài viết
				</MenuItem>
			</MenuList>
		</Menu>
	);
}
