import { ChatIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import { BsGithub } from "react-icons/bs";

const Commit = ({ data }) => {
	const { author, commit } = data;
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
				<Avatar src={author.avatar_url} size="sm" />
				<a href={author.html_url} target="_blank" rel="noreferrer">
					<Text flex="1" fontSize="sm" fontWeight="bold" ml="2">
						{author.login}
					</Text>
				</a>
				<Tooltip mr="2" label="Xem trên Github">
					<a href={data.html_url} target="_blank" rel="noreferrer">
						<IconButton icon={<BsGithub />} />
					</a>
				</Tooltip>
			</Flex>
			<Tooltip label={moment(commit.author.date).fromNow()}>
				<Text
					fontSize="sm"
					fontWeight="thin"
					mt="2"
					width="fit-content"
				>
					{moment(commit.author.date).calendar()}
				</Text>
			</Tooltip>
			<Flex alignItems="center">
				<ChatIcon />
				<Text ml="4">{commit.message}</Text>
			</Flex>
		</Box>
	);
};

export default Commit;
