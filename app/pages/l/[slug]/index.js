import { Box, Container, Heading, Image, Spinner, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useEffect } from 'react';
import Countdown from 'react-countdown';
import constants from '../../../config/constants';

export async function getServerSideProps(context) {
    try {
        const { slug } = context.query

        const res = await axios.get(`${constants.api}/url/convert/${slug}`)
        const info = await (await axios.get(`${constants.api}/url/info?url=${res.data.data.url}`)).data.data

        return {
            props: {
                data: {
                    ...res.data.data,
                    info
                }
            }
        }

    }
    catch (error) {
        return {
            props: {
                data: null
            }
        }
    }
}

const LinkRedirect = ({ data }) => {
    const t = 5000
    useEffect(() => {
        setTimeout(() => window.location = data.url, t)
    }, [data.url])

    return (
        <Container>
            <Head>
                <title>
                    Chuyển hướng {'->'} {data.title}
                </title>
            </Head>

            <Box w="100%" border="1px solid #ddd" mt="2">
                <Image
                    w="100%"
                    src={data.info.img}
                    alt={data.title} />

                <Box p="2" background="gray.100" borderTop="1px solid #ddd">
                    <Heading size="sm">
                        {data.title || data.description}
                    </Heading>
                    <Text>
                        {data.description || data.title}
                    </Text>
                </Box>
            </Box>

            <Countdown
                date={Date.now() + t}
                renderer={({ seconds, completed }) => {
                    return completed ? <Heading mt="2" size="sm">
                        Đang chuyển hướng...<Spinner size="sm" />
                    </Heading> : <Stat mt="2">
                        <StatLabel>
                            Chuyển hướng sau
                        </StatLabel>
                        <StatNumber>
                            {seconds} giây
                        </StatNumber>
                    </Stat>
                }}
            />
        </Container>
    )
}

export default LinkRedirect