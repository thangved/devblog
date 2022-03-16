import {
	Button,
	Center,
	FormControl,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Auth } from "../../../providers/AuthProvider";
import constants from "../../../config/constants";
import { toast } from "react-hot-toast";

export default function Register() {
	const router = useRouter();
	const { user, setToken } = useContext(Auth);

	if (user.login) router.push("/");

	const formik = useFormik({
		initialValues: {
			username: "",
			fullName: "",
			password: "",
			confirmPassword: "",
		},
		onSubmit: async (values) => {
			try {
				const data = (
					await axios.post(`${constants.api}/user/create`, {
						...values,
					})
				).data;

				if (!data.success) return toast.error(data.message);

				toast.success("Đã tạo tài khoản");
				setToken(data.data.token);
			} catch (error) {
				toast.error(error.toString());
			}
		},
	});

	return (
		<Center>
			<Head>
				<title>Đăng ký</title>
			</Head>

			<form onSubmit={formik.handleSubmit}>
				<Center>
					<Heading>Đăng ký</Heading>
				</Center>

				<FormControl>
					<FormLabel htmlFor="fullName">Họ tên</FormLabel>
					<Input
						id="fullName"
						name="fullName"
						value={formik.values.fullName}
						onChange={formik.handleChange}
					/>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="username">Tên đăng nhập</FormLabel>
					<Input
						id="username"
						name="username"
						value={formik.values.username}
						onChange={formik.handleChange}
					/>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="password">Mật khẩu</FormLabel>
					<Input
						id="password"
						name="password"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
					/>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="confirmPassword">
						Nhập lại mật khẩu
					</FormLabel>
					<Input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						value={formik.values.confirmPassword}
						onChange={formik.handleChange}
					/>
				</FormControl>

				<Button
					mt="2"
					isFullWidth
					colorScheme="blue"
					onClick={formik.handleSubmit}
				>
					Đăng ký
				</Button>
			</form>
		</Center>
	);
}
