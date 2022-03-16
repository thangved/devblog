import {
	Container,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import Commits from "./Commits";
import Comments from "./Comments";
import Head from "next/head";

const Updates = () => {
	return (
		<Container>
			<Head>
				<title>Cập nhật</title>
			</Head>
			<Tabs>
				<TabList>
					<Tab>Commits</Tab>
					<Tab>Comments</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<Commits />
					</TabPanel>
					<TabPanel>
						<Comments />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container>
	);
};

export default Updates;
