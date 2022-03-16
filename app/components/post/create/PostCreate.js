import {
	Badge,
	Button,
	FormControl,
	FormLabel,
	Input,
	Switch,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Textarea,
	Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { TagsInput } from "react-tag-input-component";
import constants from "../../../config/constants";
import { Auth } from "../../../providers/AuthProvider";
import Markdown from "../../markdown/Markdown";

export default function PostCreate({
	update,
	post,
	onCreate = Function,
	onCancel = Function,
}) {
	const { token } = useContext(Auth);
	const [topics, setTopics] = useState(post?.topics || []);
	const [isPublic, setIsPublic] = useState(post?.public);

	const formik = useFormik({
		initialValues: {
			title: post?.title,
			content: post?.content,
		},
		onSubmit: async (values) => {
			const method = update ? "update" : "create";
			const message = `Đã ${update ? "lưu" : "tạo"} bài viết`;
			try {
				const data = (
					await axios.post(`${constants.api}/post/${method}`, {
						...values,
						token,
						topics,
						postId: post?._id,
						public: isPublic,
					})
				).data;

				if (!data.success) return toast.error(data.message);

				toast.success(message);
				onCreate(data.data);
			} catch (error) {
				toast.error(error.toString());
			}
		},
	});

	return (
		<Tabs>
			<TabList>
				<Tab>Chỉnh sửa</Tab>
				<Tab>Xem trước</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
					<form onSubmit={formik.handleSubmit}>
						<FormControl>
							<FormLabel htmlFor="title">Tiêu đề</FormLabel>
							<Input
								value={formik.values.title}
								name="title"
								id="title"
								placeholder="Nhập tiêu đề"
								onChange={formik.handleChange}
								size="lg"
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="content">
								Nội dung{" "}
								<Tooltip label="Markdown là một ngôn ngữ đánh dấu với cú pháp văn bản thô, được thiết kế để có thể dễ dàng chuyển thành HTML và nhiều định dạng khác sử dụng một công cụ cùng tên. Nó thường được dùng để tạo các tập tin readme, viết tin nhắn trên các diễn đàn, và tạo văn bản có định dạng bằng một trình biên tập văn bản thô.">
									<Badge colorScheme="green" variant="solid">
										Hỗ trợ Markdown
									</Badge>
								</Tooltip>
							</FormLabel>
							<Textarea
								value={formik.values.content}
								name="content"
								id="content"
								placeholder="Viết gì đó..."
								height="xs"
								onChange={formik.handleChange}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Chủ đề</FormLabel>
							<TagsInput
								value={topics}
								placeHolder="Thêm chủ đề"
								onChange={setTopics}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Công khai?</FormLabel>
							<Switch
								isChecked={isPublic}
								onChange={(event) =>
									setIsPublic(event.target.checked)
								}
							/>
						</FormControl>
					</form>
				</TabPanel>
				<TabPanel
					maxHeight="700"
					overflow="auto"
					marginBottom="2"
					borderBottom="1px solid #ddd"
				>
					<Markdown>{formik.values.content}</Markdown>
				</TabPanel>
			</TabPanels>

			<Button
				ml="4"
				mr="4"
				mb="4"
				colorScheme="blue"
				type="submit"
				onClick={formik.handleSubmit}
			>
				{update ? "Lưu" : "Tạo"}
			</Button>

			<Button mr="4" mb="4" onClick={onCancel}>
				Hủy
			</Button>
		</Tabs>
	);
}
