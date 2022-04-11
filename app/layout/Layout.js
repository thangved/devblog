import { Toaster } from "react-hot-toast";
import Providers from "../providers/index";
import Header from "./Header";
import styles from "./Layout.module.scss";
import "moment/locale/vi";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function Layout({ children }) {
	const router = useRouter();
	return (
		<Providers>
			<div id="fb-root"></div>
			<script
				async
				defer
				crossOrigin="anonymous"
				src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v13.0&appId=1304946696601356&autoLogAppEvents=1"
				nonce="WRd1PPcG"
			></script>
			<div className={styles.wrapper}>
				<Header />
				<div className={styles.content}>{children}</div>
				<Toaster />
			</div>
			<Tooltip label="Xem cập nhật">
				<IconButton
					onClick={() => router.push("/updates")}
					position="fixed"
					right="4"
					bottom="4"
					borderRadius="full"
					icon={<InfoIcon />}
				/>
			</Tooltip>
		</Providers>
	);
}

