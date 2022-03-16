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
import toast from "react-hot-toast";
import { useContext } from "react";
import constants from "../../../config/constants";
import { Auth } from "../../../providers/AuthProvider";
import { useRouter } from "next/router";
import Head from "next/head";
import { Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Login() {
	const router = useRouter();
	const { user, setToken } = useContext(Auth);
	if (user.login) router.push("/");

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: async (values) => {
			try {
				const data = await (
					await axios.post(`${constants.api}/user/login`, values)
				).data;

				if (!data.success) return toast.error(data.message);

				setToken(data.data.token);
				toast.success("Bạn đã đăng nhập thành công");
				router.back();
			} catch (error) {
				toast.error(error.toString());
			}
		},
	});

	return (
		<Center h="100%">
			<Head>
				<title>Đăng nhập</title>
			</Head>
			<form onSubmit={formik.handleSubmit}>
				<Center>
					<Heading>Đăng nhập</Heading>
				</Center>
				<FormControl>
					<FormLabel htmlFor="username">Tên đăng nhập</FormLabel>
					<Input
						value={formik.values.username}
						id="username"
						name="username"
						onChange={formik.handleChange}
					/>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="password">Mật khẩu</FormLabel>
					<Input
						value={formik.values.password}
						id="password"
						name="password"
						onChange={formik.handleChange}
						type="password"
					/>
				</FormControl>
				<Button
					type="submit"
					isFullWidth
					colorScheme="blue"
					marginTop={2}
				>
					Đăng nhập
				</Button>
				<Text>
					Bạn chưa có tài khoản?{" "}
					<Link href="/auth/register">
						<a>Đăng ký ngay</a>
					</Link>
				</Text>
			</form>
		</Center>
	);
}
