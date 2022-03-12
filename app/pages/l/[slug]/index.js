import { Center, Container, Heading, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Countdown from 'react-countdown';
import { toast } from 'react-hot-toast';
import constants from '../../../config/constants';

const LinkRedirect = () => {

    const router = useRouter()

    useEffect(() => {
        if (!router.query.slug)
            return
        const redirect = async () => {
            try {
                const res = await axios.get(`${constants.api}/url/convert/${router.query.slug}`)
                if (!res.data.success)
                    return toast.error(data.message)

                setTimeout(() => {
                    window.location = res.data.data.url
                }, 3000)
            } catch (error) {
                toast.error(error.toString())
            }
        }
        redirect()
    }, [router.query])

    return (
        <Container>
            <Head>
                <title>
                    Đang chuyển hướng...
                </title>
            </Head>

            <Countdown
                date={Date.now() + 3000}
                renderer={({ seconds, completed }) => {
                    return completed ? <Heading size="sm">
                        Đang chuyển hướng...
                    </Heading> : <Center>
                        <Stat>
                            <StatLabel>
                                Chuyển hướng sau
                            </StatLabel>
                            <StatNumber>
                                {seconds} giây
                            </StatNumber>
                        </Stat>
                    </Center>
                }}
            />
        </Container>
    )
}

export default LinkRedirect