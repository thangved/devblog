import { ChatIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import { BsGithub } from "react-icons/bs";
import Markdown from "../../components/markdown/Markdown";

const Comment = ({ data }) => {
	const { user } = data;
	return (
		<Box
			width="100%"
			background="gray.100"
			mt="2"
			mb="2"
			p="2"
			borderRadius="5px"
		>
			<Flex justifyContent="flex-start" alignItems="center" pr="2">
				<Avatar src={user.avatar_url} size="sm" />
				<Box flex="1">
					<a href={user.html_url} target="_blank" rel="noreferrer">
						<Text fontSize="sm" fontWeight="bold" ml="2">
							{user.login}
						</Text>
					</a>
				</Box>
				<Tooltip mr="2" label="Xem trên Github">
					<a href={data.html_url} target="_blank" rel="noreferrer">
						<IconButton icon={<BsGithub />} />
					</a>
				</Tooltip>
			</Flex>
			<Tooltip label={moment(data.created_at).fromNow()}>
				<Text
					fontSize="sm"
					fontWeight="thin"
					mt="2"
					width="fit-content"
				>
					{moment(data.created_at).calendar()}
				</Text>
			</Tooltip>
			<Markdown>{data.body}</Markdown>
		</Box>
	);
};

export default Comment;
