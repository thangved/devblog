import styles from "./Layout.module.scss";
import Logo from "../components/Logo";
import Navbar from "./Navbar";
import Link from "next/link";

export default function Header() {
	return (
		<div className={styles.header}>
			<Link href="/">
				<a>
					<Logo />
				</a>
			</Link>
			<Navbar />
		</div>
	);
}
