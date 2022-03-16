import { DeleteIcon, LinkIcon } from "@chakra-ui/icons";
import {
	HStack,
	IconButton,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Box,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import constants from "../../config/constants";
import { Auth } from "../../providers/AuthProvider";
import { Share } from "../../providers/ShareProvider";
import getDomain from "../../utils/getDomain";

const Links = ({ myLinks, setMyLinks }) => {
	const { openShare } = useContext(Share);

	const { token } = useContext(Auth);

	const onRemove = async (_id) => {
		try {
			const res = await axios.post(`${constants.api}/url/remove`, {
				token,
				_id,
			});

			if (!res.data.success) return toast.error(res.data.message);

			toast.success(res.data.message);
			setMyLinks((prev) => prev.filter((e) => e._id !== _id));
		} catch (error) {
			toast.error(error.toString());
		}
	};

	return (
		<Box w="100%" overflowX="auto">
			<Table size="sm" variant="striped">
				<Thead>
					<Tr>
						<Th>#</Th>
						<Th>Link gốc</Th>
						<Th>Link rút gọn</Th>
						<Th>Tiêu đề</Th>
						<Th>Views</Th>
						<Th>Actions</Th>
					</Tr>
				</Thead>
				<Tbody>
					{myLinks?.map((myLink, i) => (
						<Tr key={myLink._id}>
							<Td>{++i}</Td>
							<Td>
								<a
									style={{
										color: "blue",
									}}
									href={myLink.url}
									target="_blank"
									rel="noreferrer"
								>
									{myLink.url}
								</a>
							</Td>
							<Td>
								<Link href={`/l/${myLink.slug}`}>
									<a style={{ color: "blue" }}>
										{myLink.slug}
									</a>
								</Link>
							</Td>
							<Td>{myLink.title}</Td>
							<Td>{myLink.count || 0}</Td>
							<Td>
								<HStack>
									<IconButton
										onClick={() => {
											openShare(
												`${getDomain()}/l/${
													myLink.slug
												}`,
												myLink.title
											);
										}}
									>
										<LinkIcon />
									</IconButton>

									<IconButton
										size="sm"
										colorScheme="red"
										onClick={() => onRemove(myLink._id)}
									>
										<DeleteIcon />
									</IconButton>
								</HStack>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default Links;
