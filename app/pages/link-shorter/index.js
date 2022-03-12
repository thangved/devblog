import { Container, Divider } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import constants from '../../config/constants';
import { Auth } from '../../providers/AuthProvider';
import CreateLink from './CreateLink';
import Links from './Links';

export default function LinkShorter() {

    const { token } = useContext(Auth)

    const [myLinks, setMyLinks] = useState([])

    useEffect(() => {
        const getData = async () => {
            if (!token)
                return
            try {
                const links = (await axios.post(`${constants.api}/url/my-links`, { token })).data

                if (!links.success)
                    return toast.error(links.message)
                setMyLinks(links.data)
            }
            catch (error) {
                toast.error(error.toString())
            }
        }
        getData()
    }, [token])


    return <Container maxW="xxl">
        <Head>
            <title>
                Link Shorter
            </title>
        </Head>

        <CreateLink setMyLinks={setMyLinks} />

        <Divider />

        <Links myLinks={myLinks} setMyLinks={setMyLinks} />
    </Container>
}